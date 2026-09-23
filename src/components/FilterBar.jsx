import React from 'react';
import { DATE_FILTERS, GENRE_FILTERS, CATEGORY_FILTERS } from '../data/mockEvents';
import { Sparkles, Radio, Flame, Music, Wine, Disc, Zap } from 'lucide-react';

const ICON_MAP = {
  Sparkles: Sparkles,
  Radio: Radio,
  Flame: Flame,
  Music: Music,
  Guitar: Music,
  Wine: Wine,
  Disc: Disc,
  Zap: Zap
};

export function FilterBar({
  activeDate,
  onDateChange,
  activeGenre,
  onGenreChange,
  activeCategory,
  onCategoryChange
}) {
  return (
    <div className="filters-section">
      {/* Date Filter Row */}
      <div className="filter-row">
        <span className="filter-label-tag">Quando:</span>
        {DATE_FILTERS.map((df) => (
          <button
            key={df.id}
            id={`filter-date-${df.id}`}
            className={`pill-btn ${activeDate === df.id ? 'active' : ''}`}
            onClick={() => onDateChange(df.id)}
          >
            {df.label}
          </button>
        ))}
      </div>

      {/* Genre Filter Row */}
      <div className="filter-row">
        <span className="filter-label-tag">Estilo:</span>
        {GENRE_FILTERS.map((gf) => {
          const IconComp = ICON_MAP[gf.icon] || Sparkles;
          return (
            <button
              key={gf.id}
              id={`filter-genre-${gf.id}`}
              className={`pill-btn ${activeGenre === gf.id ? 'active' : ''}`}
              onClick={() => onGenreChange(gf.id)}
            >
              <IconComp size={15} />
              <span>{gf.label}</span>
            </button>
          );
        })}
      </div>

      {/* Category Filter Row */}
      <div className="filter-row">
        <span className="filter-label-tag">Espaço:</span>
        {CATEGORY_FILTERS.map((cf) => (
          <button
            key={cf.id}
            id={`filter-cat-${cf.id}`}
            className={`pill-btn ${activeCategory === cf.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(cf.id)}
          >
            {cf.label}
          </button>
        ))}
      </div>
    </div>
  );
}
