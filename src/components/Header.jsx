import React from 'react';
import { Sparkles, MapPin, Search, PlusCircle, User, Flame } from 'lucide-react';
import { INITIAL_CITIES } from '../data/mockEvents';

export function Header({
  selectedCity,
  onCityChange,
  searchTerm,
  onSearchChange,
  onOpenCreateModal,
  onOpenProfileModal,
  user,
  goingCount
}) {
  return (
    <header className="header-glass">
      <div className="header-content">
        {/* Brand */}
        <div className="brand-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="logo-badge">
            <Flame size={24} />
          </div>
          <div className="brand-text">
            <h1>
              Social Party
              <Sparkles size={16} color="#ec4899" />
            </h1>
            <span className="brand-subtitle">O Guia da Noite & Baladas</span>
          </div>
        </div>

        {/* City Selector */}
        <div className="city-selector-wrapper">
          <MapPin size={16} color="#06b6d4" />
          <select
            id="city-select"
            className="city-select"
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
            aria-label="Selecione a cidade"
          >
            {INITIAL_CITIES.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name} {c.state !== 'BR' ? `(${c.state})` : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Search Bar */}
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input
            id="search-input"
            type="text"
            className="search-input"
            placeholder="Buscar festa, pub, DJ ou balada..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="header-actions">
          <button
            id="btn-open-create-event"
            className="btn-publish"
            onClick={onOpenCreateModal}
            title="Divulgue sua festa ou pub"
          >
            <PlusCircle size={18} />
            <span>Divulgar Rolê</span>
          </button>

          <button
            id="btn-open-profile"
            className="user-profile-btn"
            onClick={onOpenProfileModal}
            title="Ver meu perfil e rolês confirmados"
          >
            <img src={user.avatar} alt={user.name} className="user-avatar-sm" />
            <span className="badge-counter" title="Rolês onde você confirmou presença">
              {goingCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
