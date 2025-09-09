import React, { useState, useEffect } from "react";
import VirtualPet from "./components/VirtualPet";


type Trail = {
  x: number;
  y: number;
  color: string;
  id: number;
};

export default function App() {
  const [trails, setTrails] = useState<Trail[]>([]);

  // Generate neon particles
  const [particles, setParticles] = useState<{ top: number; left: number; color: string; delay: number }[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      color: `hsl(${Math.random() * 360},100%,70%)`,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  // Cursor neon trails
  const handleMouseMove = (e: React.MouseEvent) => {
    const newTrail: Trail = {
      x: e.clientX,
      y: e.clientY,
      color: `hsl(${Math.random() * 360},100%,70%)`,
      id: Date.now(),
    };
    setTrails((prev) => [...prev, newTrail]);
    setTimeout(() => setTrails((prev) => prev.filter((t) => t.id !== newTrail.id)), 400);
  };

  return (
    <div className="dashboard" onMouseMove={handleMouseMove}>
      {/* Grid Background */}
      <div className="grid-bg" />

      {/* Neon particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Cursor Trails */}
      {trails.map((trail) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{ top: trail.y, left: trail.x, backgroundColor: trail.color }}
        />
      ))}

      {/* Header */}
      <header className="dashboard-header">
        <h1 className="title">Playloop — Daily Games</h1>
        <p className="subtitle">Word games, puzzles, pets — fresh content every day.</p>
      </header>

      {/* Main Content */}
      <main className="cards">
        {/* Virtual Pet */}
        <section className="">
        
          <div className="">
            <VirtualPet />
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <small>Built for Hackathon — swap localStorage for Devvit KV when ready.</small>
      </footer>
    </div>
  );
}
