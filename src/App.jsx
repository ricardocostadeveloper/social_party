import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { LiveTicker } from './components/LiveTicker';
import { FilterBar } from './components/FilterBar';
import { EventCard } from './components/EventCard';
import { EventDetailModal } from './components/EventDetailModal';
import { CreateEventModal } from './components/CreateEventModal';
import { UserProfileModal } from './components/UserProfileModal';
import { INITIAL_EVENTS, CURRENT_USER, LIVE_ACTIVITIES } from './data/mockEvents';
import { Sparkles, Compass, Plus, Flame } from 'lucide-react';

const STORAGE_KEY = 'social_party_events_v1';

export function App() {
  // Load events from localStorage or fallback
  const [events, setEvents] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading events from storage', e);
    }
    return INITIAL_EVENTS;
  });

  // Save to localStorage whenever events change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch (e) {
      console.error('Error saving events to storage', e);
    }
  }, [events]);

  // Filters State
  const [selectedCity, setSelectedCity] = useState('São Paulo');
  const [activeDate, setActiveDate] = useState('all');
  const [activeGenre, setActiveGenre] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals State
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Current User
  const [user, setUser] = useState(CURRENT_USER);

  // Toggle Like (Joinha)
  const handleToggleLike = (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.map((evt) => {
        if (evt.id === eventId) {
          const isLiked = !evt.isLiked;
          return {
            ...evt,
            isLiked,
            likesCount: isLiked ? evt.likesCount + 1 : Math.max(0, evt.likesCount - 1)
          };
        }
        return evt;
      })
    );
  };

  // Toggle Going (Eu Vou!)
  const handleToggleGoing = (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.map((evt) => {
        if (evt.id === eventId) {
          const willGo = !evt.isGoing;
          const updatedAttendees = willGo
            ? [
                {
                  id: user.id,
                  name: user.name,
                  avatar: user.avatar
                },
                ...evt.attendees.filter((a) => a.id !== user.id)
              ]
            : evt.attendees.filter((a) => a.id !== user.id);

          return {
            ...evt,
            isGoing: willGo,
            attendeesCount: willGo ? evt.attendeesCount + 1 : Math.max(0, evt.attendeesCount - 1),
            attendees: updatedAttendees
          };
        }
        return evt;
      })
    );
  };

  // Add Comment to an event
  const handleAddComment = (eventId, commentText) => {
    const newCommentObj = {
      id: `c-${Date.now()}`,
      user: user.name,
      avatar: user.avatar,
      text: commentText,
      time: 'Agora mesmo',
      likes: 1
    };

    setEvents((prevEvents) =>
      prevEvents.map((evt) => {
        if (evt.id === eventId) {
          return {
            ...evt,
            comments: [newCommentObj, ...(evt.comments || [])]
          };
        }
        return evt;
      })
    );
  };

  // Add newly created event
  const handleAddEvent = (newEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
    setSelectedCity(newEvent.city);
    setActiveDate('all');
    setActiveGenre('all');
    setActiveCategory('all');
    setSelectedEventId(newEvent.id);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setActiveDate('all');
    setActiveGenre('all');
    setActiveCategory('all');
    setSearchTerm('');
  };

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      // City
      if (selectedCity !== 'Todas as Cidades' && evt.city !== selectedCity) {
        return false;
      }
      // Date
      if (activeDate !== 'all' && evt.dateCategory !== activeDate) {
        return false;
      }
      // Genre
      if (activeGenre !== 'all' && evt.genre !== activeGenre) {
        return false;
      }
      // Category
      if (activeCategory !== 'all' && evt.category !== activeCategory) {
        return false;
      }
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const inTitle = evt.title.toLowerCase().includes(query);
        const inVenue = evt.venue.toLowerCase().includes(query);
        const inGenre = evt.genre.toLowerCase().includes(query);
        const inCity = evt.city.toLowerCase().includes(query);
        const inNeighborhood = evt.neighborhood?.toLowerCase().includes(query);
        const inLineup = evt.lineup?.some(
          (act) => act.artist.toLowerCase().includes(query) || act.role.toLowerCase().includes(query)
        );
        if (!inTitle && !inVenue && !inGenre && !inCity && !inNeighborhood && !inLineup) {
          return false;
        }
      }
      return true;
    });
  }, [events, selectedCity, activeDate, activeGenre, activeCategory, searchTerm]);

  // Selected event for detail modal
  const currentSelectedEvent = events.find((evt) => evt.id === selectedEventId) || null;

  // Total Going Count
  const goingCount = events.filter((evt) => evt.isGoing).length;

  return (
    <div className="app-container">
      {/* Top Header */}
      <Header
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        user={user}
        goingCount={goingCount}
      />

      {/* Live Activity Ticker */}
      <LiveTicker activities={LIVE_ACTIVITIES} />

      <main className="main-content">
        {/* Hero Discovery Banner */}
        <section className="hero-banner">
          <div className="hero-info">
            <h2>
              Qual é o <span className="hero-highlight">rolê de hoje</span> na sua cidade?
            </h2>
            <p className="hero-subtitle">
              Chega de abrir dezenas de stories e páginas no Instagram. Centralizamos lineups, horários,
              quem vai e a vibe das baladas e pubs em um só lugar.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-value">{filteredEvents.length}</span>
                <span className="stat-label">Rolês Ativos</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">
                  {filteredEvents.reduce((acc, curr) => acc + curr.attendeesCount, 0)}
                </span>
                <span className="stat-label">Baladeiros Conectados</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">
                  {filteredEvents.reduce((acc, curr) => acc + curr.likesCount, 0)}
                </span>
                <span className="stat-label">Joinhas / Hype</span>
              </div>
            </div>
          </div>

          <button
            id="btn-hero-publish"
            className="hero-cta-btn"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus size={18} />
            <span>Divulgar seu Pub ou Festa</span>
          </button>
        </section>

        {/* Filter Controls */}
        <FilterBar
          activeDate={activeDate}
          onDateChange={setActiveDate}
          activeGenre={activeGenre}
          onGenreChange={setActiveGenre}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Section Header */}
        <div className="events-section-header">
          <h2 style={{ fontSize: '1.4rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Flame size={20} color="#ec4899" />
            Rolês em Destaque {selectedCity !== 'Todas as Cidades' ? `em ${selectedCity}` : ''}
          </h2>
          <div className="events-count">
            Mostrando <span>{filteredEvents.length}</span> rolês
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="events-grid">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onSelectEvent={(evt) => setSelectedEventId(evt.id)}
                onToggleLike={handleToggleLike}
                onToggleGoing={handleToggleGoing}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state-box">
            <Compass size={48} color="#64748b" />
            <h3>Nenhum rolê encontrado para os filtros selecionados</h3>
            <p>
              Tente selecionar outra cidade, mudar o estilo musical ou limpar os filtros de busca.
            </p>
            <button
              id="btn-reset-filters"
              className="pill-btn active"
              onClick={handleResetFilters}
              style={{ marginTop: '0.5rem' }}
            >
              <Sparkles size={16} />
              Limpar Filtros e Ver Todos
            </button>
          </div>
        )}
      </main>

      {/* Event Details Modal */}
      {currentSelectedEvent && (
        <EventDetailModal
          event={currentSelectedEvent}
          onClose={() => setSelectedEventId(null)}
          onToggleLike={handleToggleLike}
          onToggleGoing={handleToggleGoing}
          onAddComment={handleAddComment}
          currentUser={user}
        />
      )}

      {/* Create Event Modal */}
      {isCreateModalOpen && (
        <CreateEventModal
          onClose={() => setIsCreateModalOpen(false)}
          onAddEvent={handleAddEvent}
        />
      )}

      {/* User Profile Modal */}
      {isProfileModalOpen && (
        <UserProfileModal
          user={user}
          events={events}
          onClose={() => setIsProfileModalOpen(false)}
          onSelectEvent={(evt) => setSelectedEventId(evt.id)}
          onToggleGoing={handleToggleGoing}
          onToggleLike={handleToggleLike}
        />
      )}

      {/* Footer */}
      <footer className="footer-bar">
        <div className="footer-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: 'white' }}>
            <Flame size={18} color="#ec4899" />
            Social Party
          </div>
          <p>A plataforma social que conecta você às melhores noites, pubs e festivais da sua cidade.</p>
          <div className="footer-links">
            <a href="#divulgar" className="footer-link" onClick={(e) => { e.preventDefault(); setIsCreateModalOpen(true); }}>
              Divulgue sua Casa
            </a>
            <a href="#perfil" className="footer-link" onClick={(e) => { e.preventDefault(); setIsProfileModalOpen(true); }}>
              Meus Rolês Salvos
            </a>
            <a href="#cidades" className="footer-link" onClick={(e) => { e.preventDefault(); setSelectedCity('Todas as Cidades'); }}>
              Todas as Cidades
            </a>
          </div>
          <p style={{ fontSize: '0.75rem', opacity: 0.5 }}>© 2026 Social Party - Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
