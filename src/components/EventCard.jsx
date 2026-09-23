import React, { useState } from 'react';
import { ThumbsUp, CheckCircle, MapPin, Clock, Headphones, Volume2, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { vibePlayer } from '../utils/audioVibe';

export function EventCard({
  event,
  onSelectEvent,
  onToggleLike,
  onToggleGoing
}) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleAudioPreview = (e) => {
    e.stopPropagation();
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

  const handleGoingClick = (e) => {
    e.stopPropagation();
    const willBeGoing = !event.isGoing;
    if (willBeGoing) {
      // Fire confetti from button position
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { x, y },
        colors: ['#ec4899', '#8b5cf6', '#10b981', '#06b6d4']
      });
    }
    onToggleGoing(event.id);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    onToggleLike(event.id);
  };

  return (
    <article className="event-card" id={`event-card-${event.id}`}>
      {/* Media Header */}
      <div className="card-media-wrapper" onClick={() => onSelectEvent(event)}>
        <img
          src={event.image}
          alt={event.title}
          className="card-flyer-img"
          loading="lazy"
        />
        <div className="card-overlay-gradient"></div>

        {/* Top Badges */}
        <div className="card-top-badges">
          <span className={`badge-status ${event.dateCategory === 'today' ? 'urgent' : ''}`}>
            {event.status || event.dateLabel}
          </span>

          <button
            type="button"
            className={`btn-preview-vibe ${isPlayingAudio ? 'playing' : ''}`}
            onClick={handleAudioPreview}
            title="Ouvir a vibe da festa"
          >
            {isPlayingAudio ? <Volume2 size={13} className="animate-pulse" /> : <Headphones size={13} />}
            <span>{isPlayingAudio ? 'Tocando...' : 'Vibe'}</span>
          </button>
        </div>

        {/* Bottom Tags */}
        <span className="card-genre-tag">{event.genre}</span>
        <span className="card-price-tag">{event.price}</span>
      </div>

      {/* Card Content */}
      <div className="card-content">
        <h3 className="card-title" onClick={() => onSelectEvent(event)}>
          {event.title}
        </h3>

        <div className="card-venue-info">
          <div className="venue-line">
            <MapPin size={14} color="#06b6d4" />
            <span>
              <strong>{event.venue}</strong> • {event.neighborhood}, {event.city}
            </span>
          </div>
          <div className="time-line">
            <Clock size={14} />
            <span>{event.dateLabel} ({event.time})</span>
          </div>
        </div>

        {/* Lineup Highlights */}
        {event.lineup && event.lineup.length > 0 && (
          <div className="card-lineup-preview" title="Lineup">
            {event.lineup.slice(0, 3).map((item, idx) => (
              <span key={idx} className={`lineup-pill ${idx === 0 ? 'headliner' : ''}`}>
                {item.artist}
              </span>
            ))}
            {event.lineup.length > 3 && (
              <span className="lineup-pill">+{event.lineup.length - 3} mais</span>
            )}
          </div>
        )}

        {/* Social Action Strip */}
        <div className="card-social-strip">
          {/* Attendees Facepile */}
          <div
            className="attendees-facepile"
            title={`${event.attendeesCount} pessoas vão nesse rolê`}
            onClick={() => onSelectEvent(event)}
            style={{ cursor: 'pointer' }}
          >
            {event.attendees && event.attendees.slice(0, 3).map((att) => (
              <img
                key={att.id}
                src={att.avatar}
                alt={att.name}
                className="attendee-mini-avatar"
              />
            ))}
            <span className="attendee-count-text">
              <strong>{event.attendeesCount}</strong> vão
            </span>
          </div>

          {/* Social Buttons */}
          <div className="card-actions">
            {/* Joinha (Like) */}
            <button
              id={`like-btn-${event.id}`}
              type="button"
              className={`btn-social-action ${event.isLiked ? 'liked' : ''}`}
              onClick={handleLikeClick}
              title="Dar um joinha (hype)"
            >
              <ThumbsUp size={15} />
              <span>{event.likesCount}</span>
            </button>

            {/* Eu Vou! (Going) */}
            <button
              id={`going-btn-${event.id}`}
              type="button"
              className={`btn-social-action ${event.isGoing ? 'going' : ''}`}
              onClick={handleGoingClick}
              title={event.isGoing ? 'Você vai! Clique para desmarcar' : 'Confirmar presença (Eu Vou!)'}
            >
              <CheckCircle size={15} />
              <span>{event.isGoing ? 'Vou!' : 'Bora?'}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
