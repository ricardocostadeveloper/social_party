import React, { useState } from 'react';
import { X, Sparkles, Image as ImageIcon, Calendar, MapPin, Music } from 'lucide-react';
import { INITIAL_CITIES } from '../data/mockEvents';

const FLYER_PRESETS = [
  { label: 'Neon & Techno', url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Baile & Trap', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Pub & Rock', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Rooftop & Sunset', url: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?auto=format&fit=crop&w=1200&q=80' }
];

export function CreateEventModal({ onClose, onAddEvent }) {
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    venue: '',
    city: 'São Paulo',
    neighborhood: '',
    address: '',
    dateLabel: 'Hoje, 22:00',
    dateCategory: 'today',
    time: '22:00 às 05:00',
    category: 'Balada',
    genre: 'Eletrônica',
    price: 'R$ 40 - R$ 80',
    promo: 'Dose dupla de caipirinha até 23h',
    lineupRaw: 'DJ Principal (00:00), Atração Convidada (02:00)',
    imageUrl: FLYER_PRESETS[0].url
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.venue) {
      alert('Por favor, preencha o nome do rolê e o local.');
      return;
    }

    // Parse lineup
    const parsedLineup = formData.lineupRaw
      .split(',')
      .map((item, idx) => {
        const trimmed = item.trim();
        return {
          time: idx === 0 ? '23:00 - 01:30' : idx === 1 ? '01:30 - 03:30' : '03:30 - 05:00',
          artist: trimmed,
          role: idx === 0 ? 'Headliner' : 'Convidado Especial',
          ig: `@${trimmed.toLowerCase().replace(/\s+/g, '')}`
        };
      });

    const newEvent = {
      id: `evt-user-${Date.now()}`,
      title: formData.title,
      tagline: formData.tagline || 'Prepare-se para uma noite inesquecível!',
      venue: formData.venue,
      city: formData.city,
      neighborhood: formData.neighborhood || 'Centro',
      address: formData.address || `${formData.venue} - ${formData.city}`,
      dateLabel: formData.dateLabel,
      dateCategory: formData.dateCategory,
      time: formData.time,
      category: formData.category,
      genre: formData.genre,
      status: 'RECÉM ADICIONADO 🔥',
      price: formData.price || 'Entrada sob consulta',
      ticketUrl: 'https://exemplo-ingressos.com',
      image: formData.imageUrl,
      promo: formData.promo,
      ageLimit: '18+',
      dressCode: 'Livre / Balada',
      vibeScore: 99,
      isLiked: false,
      likesCount: 1,
      isGoing: true,
      attendeesCount: 1,
      attendees: [
        {
          id: 'me',
          name: 'Você (Criador)',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
        }
      ],
      lineup: parsedLineup,
      comments: [
        {
          id: `c-${Date.now()}`,
          user: 'Você (Organizador)',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
          text: 'Rolê cadastrado! Todos convidados, a noite promete!',
          time: 'Agora mesmo',
          likes: 2
        }
      ],
      tags: ['Novo Rolê', 'Divulgação da Comunidade']
    };

    onAddEvent(newEvent);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <button
          id="btn-close-create-modal"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Fechar"
        >
          <X size={20} />
        </button>

        <div style={{ padding: '2rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.6rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={24} color="#ec4899" />
              Divulgue o seu Rolê
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Publique a festa do seu pub, balada ou evento independente para a comunidade!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="create-event-form">
            {/* Title & Tagline */}
            <div className="form-group">
              <label>Nome do Evento / Festa *</label>
              <input
                type="text"
                className="form-input"
                required
                placeholder="Ex: NOITE DO BLACKOUT | Open Bar & Trap"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Slogan ou Resumo da Vibe</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ex: A noite mais intensa de música eletrônica da cidade"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              />
            </div>

            {/* Venue, City & Neighborhood */}
            <div className="form-row-3">
              <div className="form-group">
                <label>Casa / Espaço *</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  placeholder="Ex: The Clock Rock Bar"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Cidade *</label>
                <select
                  className="form-select"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                >
                  {INITIAL_CITIES.filter((c) => c.id !== 'all').map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Bairro</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ex: Pinheiros"
                  value={formData.neighborhood}
                  onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                />
              </div>
            </div>

            {/* Date & Time */}
            <div className="form-row-3">
              <div className="form-group">
                <label>Período</label>
                <select
                  className="form-select"
                  value={formData.dateCategory}
                  onChange={(e) => setFormData({ ...formData, dateCategory: e.target.value })}
                >
                  <option value="today">Hoje à Noite</option>
                  <option value="tomorrow">Amanhã</option>
                  <option value="weekend">Este Fim de Semana</option>
                  <option value="upcoming">Próximos Dias</option>
                </select>
              </div>

              <div className="form-group">
                <label>Data Exibida</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ex: Hoje, 22:30"
                  value={formData.dateLabel}
                  onChange={(e) => setFormData({ ...formData, dateLabel: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Horário</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ex: 22:00 às 05:00"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>

            {/* Genre & Category */}
            <div className="form-row-2">
              <div className="form-group">
                <label>Estilo Musical Principal</label>
                <select
                  className="form-select"
                  value={formData.genre}
                  onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                >
                  <option value="Eletrônica">Eletrônica & Techno</option>
                  <option value="Funk">Funk & Mandelão</option>
                  <option value="Pagode">Pagode & Samba</option>
                  <option value="Rock">Rock & Pub</option>
                  <option value="Sertanejo">Sertanejo Universitário</option>
                  <option value="Pop">Pop & Disco</option>
                  <option value="Trap">Trap & Hip-Hop</option>
                </select>
              </div>

              <div className="form-group">
                <label>Tipo de Espaço</label>
                <select
                  className="form-select"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Balada">Balada & Club</option>
                  <option value="Pub & Bar">Pub & Bar</option>
                  <option value="Rooftop">Rooftop & Lounge</option>
                  <option value="Festival">Festival & Rave</option>
                </select>
              </div>
            </div>

            {/* Lineup */}
            <div className="form-group">
              <label>Lineup de Atrações (separe por vírgula)</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ex: DJ Alex, Banda Viva o Samba, MC Zoi"
                value={formData.lineupRaw}
                onChange={(e) => setFormData({ ...formData, lineupRaw: e.target.value })}
              />
            </div>

            {/* Price & Promo */}
            <div className="form-row-2">
              <div className="form-group">
                <label>Preço / Ingressos</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ex: R$ 30 - R$ 60 (Mulheres VIP até 23h)"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Promoção / Diferencial</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ex: Double Chopp até 22h"
                  value={formData.promo}
                  onChange={(e) => setFormData({ ...formData, promo: e.target.value })}
                />
              </div>
            </div>

            {/* Flyer Image Selection */}
            <div className="form-group">
              <label>Flyer / Foto de Capa (Selecione um tema ou insira URL)</label>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                {FLYER_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`pill-btn ${formData.imageUrl === preset.url ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, imageUrl: preset.url })}
                  >
                    <ImageIcon size={14} />
                    {preset.label}
                  </button>
                ))}
              </div>
              <input
                type="url"
                className="form-input"
                placeholder="Ou cole o link direto da imagem..."
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              />
            </div>

            <button type="submit" id="btn-submit-new-event" className="btn-submit-event">
              Publicar Rolê Agora 🔥
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
