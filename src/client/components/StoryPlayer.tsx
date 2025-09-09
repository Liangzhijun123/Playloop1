import React, { useState } from 'react';
import questData from './quest.json';

export default function StoryPlayer() {
  const [currentNodeId, setCurrentNodeId] = useState(1);
  const [stats, setStats] = useState({ xp: 0, health: 100, happiness: 50 });

  const node = questData.nodes.find(n => n.id === currentNodeId);

  const choose = (choice) => {
    // Apply effects
    const newStats = { ...stats };
    Object.keys(choice.effect).forEach(key => {
      newStats[key] = (newStats[key] || 0) + choice.effect[key];
    });
    setStats(newStats);

    // Move to next node
    if (choice.next) setCurrentNodeId(choice.next);
  };

  return (
    <div className="card neon-card story-card">
      <h2>{questData.title}</h2>
      <p>{node.text}</p>
      {node.treasure && <p>🎁 You found: {node.treasure}</p>}
      {node.monster && <p>⚔️ Beware of: {node.monster}</p>}
      <div className="actions">
        {node.choices.map((c, i) => (
          <button key={i} onClick={() => choose(c)}>{c.text}</button>
        ))}
      </div>
      <div className="stats">
        XP: {stats.xp} | Health: {stats.health} | Happiness: {stats.happiness}
      </div>
    </div>
  );
}
