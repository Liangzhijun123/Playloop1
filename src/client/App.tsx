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
  const setActiveView = (x) => {}
  const activeView = 'home';
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
    <div className="flex flex-col items-center justify-center h-full">
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


      {/* Main Content */}
      <main className="cards flex flex-col items-center justify-center h-full">
        {/* Virtual Pet */}
        <section className="flex flex-col h-full">
        
          <div className="">
            <VirtualPet />
          </div>
        </section>

      </main>

 <nav className="bottom-nav">
        <div 
          className={`nav-item ${activeView === 'home' ? 'active' : ''}`}
          onClick={() => setActiveView('home')}
        >
          <img src="/home.png" alt="Home" className="nav-icon" />
          <span>Home</span>
        </div>
        <div 
          className={`nav-item ${activeView === 'shop' ? 'active' : ''}`}
          onClick={() => setActiveView('shop')}
        >
          <img src="/shop.png" alt="Shop" className="nav-icon" />
          <span>Shop</span>
        </div>
        <div 
          className={`nav-item ${activeView === 'story' ? 'active' : ''}`}
          onClick={() => setActiveView('story')}
        >
          <img src="/story.png" alt="Story" className="nav-icon" />
          <span>Story</span>
        </div>
        <div 
          className={`nav-item ${activeView === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveView('chat')}
        >
          <img src="/chat.png" alt="Chat" className="nav-icon" />
          <span>Chat</span>
        </div>
      </nav>
    </div>
  );
}
