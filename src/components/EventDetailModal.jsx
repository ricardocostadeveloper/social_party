import React, { useState } from 'react';
import {
  X,
  MapPin,
  Clock,
  Calendar,
  ThumbsUp,
  CheckCircle,
  Ticket,
  Sparkles,
  Share2,
  Users,
  MessageCircle,
  Send,
  Headphones,
  Volume2,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { vibePlayer } from '../utils/audioVibe';

const QUICK_REACTIONS = [
  '🔥 Esse rolê vai explodir!',
  '🚗 Alguém saindo da ZS pra dividir Uber?',
  '💃 Quem anima chegar cedo?',
  '🍸 Partiu aproveitar o double drink!'
];

export function EventDetailModal({
  event,
  onClose,
  onToggleLike,
  onToggleGoing,
  onAddComment,
  currentUser
}) {
  const [newComment, setNewComment] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!event) return null;

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      vibePlayer.stop();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      vibePlayer.playGenreVibe(event.genre, () => {
        setIsPlayingAudio(false);
      });
    }
  };

  const handleGoing = (e) => {
    const willBeGoing = !event.isGoing;
    if (willBeGoing) {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10b981', '#ec4899', '#8b5cf6', '#06b6d4', '#f59e0b']
      });
    }
    onToggleGoing(event.id);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Bora nesse rolê? ${event.title} no ${event.venue}!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(event.id, newComment.trim());
    setNewComment('');
  };

  const handleQuickReaction = (text) => {
    onAddComment(event.id, text);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          id="btn-close-modal"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Fechar"
        >
          <X size={20} />
        </button>

        {/* Hero Header */}
        <div className="modal-header-hero">
          <img src={event.image} alt={event.title} className="modal-hero-bg" />
          <div className="modal-hero-gradient"></div>

          <div className="modal-hero-info">
            <div className="modal-badge-row">
              <span className="badge-status urgent">{event.genre}</span>
              <span className="badge-status">{event.category}</span>
              <span className="badge-status" style={{ background: 'rgba(16, 185, 129, 0.25)', borderColor: '#10b981', color: '#6ee7b7' }}>
                🔥 Vibe Score {event.vibeScore}%
              </span>
            </div>
            <h2 className="modal-title">{event.title}</h2>
            <p className="modal-tagline">{event.tagline}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Actions & Ticket Bar */}
          <div className="modal-actions-bar">
            <div className="modal-action-buttons">
              {/* Presença ("Eu Vou!") */}
              <button
                id="btn-modal-going"
                className={`btn-primary-going ${event.isGoing ? 'active' : ''}`}
                onClick={handleGoing}
              >
                <CheckCircle size={18} />
                <span>{event.isGoing ? 'Presença Confirmada! ✅' : 'Eu Vou Nesse Rolê!'}</span>
              </button>

              {/* Joinha / Hype */}
              <button
                id="btn-modal-hype"
                className={`btn-primary-hype ${event.isLiked ? 'active' : ''}`}
                onClick={() => onToggleLike(event.id)}
              >
                <ThumbsUp size={18} />
                <span>{event.likesCount} Joinhas</span>
              </button>

              {/* Vibe Audio Snippet */}
              <button
                className={`btn-primary-hype ${isPlayingAudio ? 'active' : ''}`}
                onClick={handleToggleAudio}
                title="Ouvir sintetizador com o som da festa"
              >
                {isPlayingAudio ? <Volume2 size={18} /> : <Headphones size={18} />}
                <span>{isPlayingAudio ? 'Pausar Vibe' : 'Ouvir a Vibe'}</span>
              </button>

              {/* Share */}
              <button
                className="btn-primary-hype"
                onClick={handleShare}
                title="Compartilhar com os amigos"
              >
                <Share2 size={18} />
                <span>{copiedLink ? 'Link Copiado!' : 'Convidar'}</span>
              </button>
            </div>

            {/* Ingressos */}
            <div className="ticket-cta-box">
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Ingressos a partir de</span>
                <div className="ticket-price-display">{event.price}</div>
              </div>
              <a
                href={event.ticketUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-buy-ticket"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`🎟️ Redirecionando para a bilheteria oficial de: ${event.title}\nLocal: ${event.venue}\nValor: ${event.price}`);
                }}
              >
                <Ticket size={18} />
                <span>Garantir Ingresso</span>
              </a>
            </div>
          </div>

          {/* Special Promo Alert */}
          {event.promo && (
            <div className="promo-callout">
              <Sparkles size={22} color="#f59e0b" style={{ flexShrink: 0 }} />
              <div>
                <strong>Promoção da Noite:</strong> {event.promo}
              </div>
            </div>
          )}

          {/* Venue & Date Details Cards */}
          <div className="detail-grid">
            <div className="detail-card">
              <span className="detail-card-label">
                <Calendar size={14} color="#8b5cf6" />
                Data & Horário
              </span>
              <span className="detail-card-value">{event.dateLabel}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Abertura dos portões: {event.time}</span>
            </div>

            <div className="detail-card">
              <span className="detail-card-label">
                <MapPin size={14} color="#06b6d4" />
                Localização
              </span>
              <span className="detail-card-value">{event.venue}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{event.address}</span>
            </div>

            <div className="detail-card">
              <span className="detail-card-label">
                <AlertCircle size={14} color="#ec4899" />
                Informações
              </span>
              <span className="detail-card-value">Classificação: {event.ageLimit}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Traje: {event.dressCode}</span>
            </div>
          </div>

          {/* Lineup & Timetable */}
          <div>
            <h4 className="section-title">
              <Clock size={18} color="#ec4899" />
              Lineup & Horários de Palco (Timetable)
            </h4>
            <div className="timetable-list">
              {event.lineup && event.lineup.map((act, idx) => (
                <div key={idx} className="timetable-item">
                  <div className="timetable-time">{act.time}</div>
                  <div className="timetable-artist-info">
                    <div className="timetable-artist-name">{act.artist}</div>
                    <div className="timetable-role">{act.role}</div>
                  </div>
                  {act.ig && (
                    <a
                      href={`https://instagram.com/${act.ig.replace('@', '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="timetable-social-link"
                    >
                      {act.ig} <ExternalLink size={12} style={{ display: 'inline' }} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quem Vai (Attendees Facepile & List) */}
          <div className="attendees-full-section">
            <h4 className="section-title">
              <Users size={18} color="#10b981" />
              Quem Vai Nesse Rolê ({event.attendeesCount} confirmados)
            </h4>
            <div className="attendees-avatars-grid">
              {event.isGoing && (
                <div className="attendee-chip" style={{ borderColor: '#10b981', background: 'rgba(16, 185, 129, 0.15)' }}>
                  <img src={currentUser.avatar} alt={currentUser.name} />
                  <span><strong>{currentUser.name}</strong> (Você ✅)</span>
                </div>
              )}
              {event.attendees && event.attendees.map((att) => (
                <div key={att.id} className="attendee-chip">
                  <img src={att.avatar} alt={att.name} />
                  <span>{att.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vibe Chat / Comments Section */}
          <div className="comments-section">
            <h4 className="section-title">
              <MessageCircle size={18} color="#06b6d4" />
              Chat da Vibe & Combinações ({event.comments?.length || 0})
            </h4>

            {/* Quick reaction chips */}
            <div className="comment-quick-reactions">
              {QUICK_REACTIONS.map((reac, i) => (
                <button
                  key={i}
                  type="button"
                  className="quick-reaction-btn"
                  onClick={() => handleQuickReaction(reac)}
                >
                  {reac}
                </button>
              ))}
            </div>

            {/* Input form */}
            <form onSubmit={handleCommentSubmit} className="comment-input-row">
              <input
                type="text"
                className="comment-input-field"
                placeholder="Comente algo, combine carona ou pergunte sobre a festa..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                type="submit"
                className="btn-send-comment"
                disabled={!newComment.trim()}
                aria-label="Enviar comentário"
              >
                <Send size={16} />
              </button>
            </form>

            {/* Comments List */}
            <div className="comments-list">
              {event.comments && event.comments.length > 0 ? (
                event.comments.map((comment) => (
                  <div key={comment.id} className="comment-item">
                    <img src={comment.avatar} alt={comment.user} className="comment-avatar" />
                    <div className="comment-content">
                      <div className="comment-header">
                        <span className="comment-author">{comment.user}</span>
                        <span className="comment-time">{comment.time}</span>
                      </div>
                      <p className="comment-text">{comment.text}</p>
                      <button
                        className="btn-like-comment"
                        onClick={() => alert('Você curtiu esse comentário!')}
                      >
                        <ThumbsUp size={12} />
                        <span>{comment.likes || 0}</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Nenhum comentário ainda. Seja o primeiro a agitar a conversa!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
