import React, { useState } from 'react';
import { X, CheckCircle, ThumbsUp, Calendar, MapPin, Award, Trash2 } from 'lucide-react';

export function UserProfileModal({
  user,
  events,
  onClose,
  onSelectEvent,
  onToggleGoing,
  onToggleLike
}) {
  const [activeTab, setActiveTab] = useState('going'); // 'going' | 'liked'

  const goingEvents = events.filter((evt) => evt.isGoing);
  const likedEvents = events.filter((evt) => evt.isLiked);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <button
          id="btn-close-profile-modal"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Fechar"
        >
          <X size={20} />
        </button>

        <div style={{ padding: '2rem' }}>
          {/* Profile Header */}
          <div className="profile-header-card">
            <img src={user.avatar} alt={user.name} className="profile-avatar-lg" />
            <div className="profile-info">
              <h3>{user.name}</h3>
              <div className="profile-handle">{user.username} • {user.city}</div>
              <div className="profile-badge-pill">
                <Award size={14} color="#f59e0b" />
                <span>{user.badge}</span>
              </div>
            </div>
          </div>

          {/* Profile Stats */}
          <div className="profile-stats-row">
            <div className="profile-stat-box">
              <div className="number" style={{ color: '#10b981' }}>{goingEvents.length}</div>
              <div className="label">Presenças Confirmadas</div>
            </div>
            <div className="profile-stat-box">
              <div className="number" style={{ color: '#ec4899' }}>{likedEvents.length}</div>
              <div className="label">Rolês Curtidos</div>
            </div>
            <div className="profile-stat-box">
              <div className="number" style={{ color: '#06b6d4' }}>99%</div>
              <div className="label">Frequência da Vibe</div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <button
              id="tab-profile-going"
              className={`pill-btn ${activeTab === 'going' ? 'active' : ''}`}
              onClick={() => setActiveTab('going')}
            >
              <CheckCircle size={15} />
              <span>Meus Rolês Confirmados ({goingEvents.length})</span>
            </button>
            <button
              id="tab-profile-liked"
              className={`pill-btn ${activeTab === 'liked' ? 'active' : ''}`}
              onClick={() => setActiveTab('liked')}
            >
              <ThumbsUp size={15} />
              <span>Curtidos por Mim ({likedEvents.length})</span>
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'going' && (
            <div>
              {goingEvents.length === 0 ? (
                <div className="empty-state-box">
                  <Calendar size={36} color="#64748b" />
                  <h3>Você ainda não confirmou presença em nenhum rolê!</h3>
                  <p>Navegue pelo feed, escolha onde quer curtir e clique em <strong>"Bora?"</strong> para salvar aqui.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {goingEvents.map((evt) => (
                    <div
                      key={evt.id}
                      className="timetable-item"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        onClose();
                        onSelectEvent(evt);
                      }}
                    >
                      <img
                        src={evt.image}
                        alt={evt.title}
                        style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover' }}
                      />
                      <div style={{ flex: 1, marginLeft: '0.85rem' }}>
                        <h4 style={{ fontSize: '0.95rem', color: 'white', marginBottom: '0.2rem' }}>
                          {evt.title}
                        </h4>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', gap: '0.6rem' }}>
                          <span><MapPin size={12} style={{ display: 'inline' }} /> {evt.venue}</span>
                          <span>• {evt.dateLabel}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn-social-action"
                        style={{ color: '#ef4444' }}
                        title="Desmarcar presença"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleGoing(evt.id);
                        }}
                      >
                        <Trash2 size={14} />
                        <span>Desmarcar</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'liked' && (
            <div>
              {likedEvents.length === 0 ? (
                <div className="empty-state-box">
                  <ThumbsUp size={36} color="#64748b" />
                  <h3>Nenhum rolê curtido ainda</h3>
                  <p>Dê um joinha nos rolês mais animados para salvar sua lista de favoritos da noite.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {likedEvents.map((evt) => (
                    <div
                      key={evt.id}
                      className="timetable-item"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        onClose();
                        onSelectEvent(evt);
                      }}
                    >
                      <img
                        src={evt.image}
                        alt={evt.title}
                        style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover' }}
                      />
                      <div style={{ flex: 1, marginLeft: '0.85rem' }}>
                        <h4 style={{ fontSize: '0.95rem', color: 'white', marginBottom: '0.2rem' }}>
                          {evt.title}
                        </h4>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', gap: '0.6rem' }}>
                          <span>{evt.venue}</span>
                          <span>• {evt.genre}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn-social-action liked"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleLike(evt.id);
                        }}
                      >
                        <ThumbsUp size={14} />
                        <span>Curtido</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
