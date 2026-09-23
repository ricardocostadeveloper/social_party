import React, { useState, useEffect } from 'react';
import { LIVE_ACTIVITIES } from '../data/mockEvents';

export function LiveTicker({ activities = LIVE_ACTIVITIES }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [activities.length]);

  const current = activities[currentIndex] || activities[0];

  return (
    <div className="live-activity-bar">
      <div className="live-pulse-badge">
        <span className="pulse-dot"></span>
        <span>Ao Vivo</span>
      </div>
      <div className="activity-text-marquee">
        <span className="activity-user-bold">{current.user}</span>{' '}
        <span>{current.text}</span>{' '}
        <span className="activity-event-bold">{current.event}</span>{' '}
        <span style={{ opacity: 0.6 }}>• {current.time}</span>
      </div>
    </div>
  );
}
