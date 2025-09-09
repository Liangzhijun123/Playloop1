import React, { useState } from 'react';
import StoryPlayer from './StoryPlayer';
import './VirtualPet.css';

export default function VirtualPetDashboard() {
  const [pet, setPet] = useState({
    name: 'Spark',
    level: 1,
    happiness: 60,
    xp: 0,
    xpNeeded: 60,
  });

  const feedOptions = ['BONE', 'FISH', 'MILK', 'MEAT', 'FIREBERRY'];

  return (
    <div>
      <div className="dashboard-header">
        <h1 className="title">Virtual Pet World</h1>
    
      </div>

      <div className="dashboard-grid">
        {/* Pet Stats */}
        <div className="card neon-card">
          <h2>{pet.name} 🐾</h2>
          <p>Level: {pet.level}</p>
          <p>Happiness: {pet.happiness}</p>
          <p>XP: {pet.xp}/{pet.xpNeeded}</p>
          <div className="feed-buttons">
            {feedOptions.map((food, i) => (
              <button key={i} onClick={() => setPet({...pet, xp: pet.xp + 5, happiness: pet.happiness + 3})}>
                Feed {food}
              </button>
            ))}
          </div>
        </div>

        {/* Quest / Story */}
        <StoryPlayer />

        {/* Achievements */}
        <div className="card neon-card">
          <h2>Achievements 🏅</h2>
          <ul>
            <li>First Feed 🥇</li>
            <li>Level Up 🥈</li>
            <li>Daily Adventure Complete 🥉</li>
          </ul>
        </div>

        {/* Leaderboard */}
        <div className="card neon-card">
          <h2>Leaderboard 🏆</h2>
          <ol>
            <li>User123 — Level 10</li>
            <li>NeonFox — Level 8</li>
            <li>Spark 🐾 — Level 5</li>
          </ol>
          <button>View Full Board</button>
        </div>
      </div>

      <div className="dashboard-footer">
        © 2025 Virtual Pet World
      </div>
    </div>
  );
}
