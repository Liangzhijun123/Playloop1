import React, { useState, useRef, useEffect, JSX } from 'react';
import DailyWord from './components/DailyWord';
import DailyAnagram from './components/DailyAnagram';
import VirtualPet from './components/VirtualPet';
import FlipCoins from './components/FlipCoins';
import Wordle from './components/Wordle';

type Trail = {
  x: number;
  y: number;
  color: string;
  id: number;
};

type CardInfo = {
  title: string;
  color: string;
  img: string;
  component: JSX.Element;
  ref: React.RefObject<HTMLDivElement>;
};

export function App() {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const games: CardInfo[] = [
    // {
    //   title: 'Daily Word Guess',
    //   color: '#00fff7',
    //   img: '/images/daily-word.png',
    //   component: <DailyWord />,
    //   ref: cardRefs[0],
    // },
    // {
    //   title: 'Daily Anagram',
    //   color: '#ff00ff',
    //   img: '/images/daily-anagram.png',
    //   component: <DailyAnagram />,
    //   ref: cardRefs[1],
    // },
    {
      title: 'Virtual Pet',
      color: '#ff0055',
      img: '/images/virtual-pet.png',
      component: <VirtualPet />,
      ref: cardRefs[2],
    },
    // {
    //   title: 'Wordle Clone',
    //   color: '#00ff00',
    //   component: <Wordle />,
    //   img: '/images/virtual-pet.png',
    //   ref: cardRefs[3],
    // },
    // {
    //   title: 'Flip Coins',
    //   color: '#ff9900',
    //   component: <FlipCoins />,
    //   img: '/images/virtual-pet.png',
    //   ref: cardRefs[4],
    // },
  ];

  // Cursor neon trails
  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
    if (hoveredCard !== null) {
      const newTrail: Trail = {
        x: e.clientX,
        y: e.clientY,
        color: `hsl(${Math.random() * 360}, 100%, 70%)`,
        id: Date.now(),
      };
      setTrails((prev) => [...prev, newTrail]);
      setTimeout(() => setTrails((prev) => prev.filter((t) => t.id !== newTrail.id)), 400);
    }
  };

  return (
    <div
      className="relative min-h-screen font-sans text-white overflow-hidden bg-[#0f0c29]"
      onMouseMove={handleMouseMove}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 -z-20">
        <div
          className="w-full h-full absolute"
          style={{
            backgroundSize: '50px 50px',
            backgroundImage:
              'linear-gradient(to right, rgba(0,255,247,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,255,247,0.1) 1px, transparent 1px)',
            animation: 'moveGrid 10s linear infinite',
          }}
        />
      </div>

      {/* Neon particles */}
      <div className="absolute inset-0 -z-10">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-70 animate-particle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: `hsl(${Math.random() * 360},100%,70%)`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Cursor trails */}
      {trails.map((trail) => (
        <div
          key={trail.id}
          className="absolute w-2 h-2 rounded-full opacity-80 animate-trail"
          style={{ top: trail.y, left: trail.x, backgroundColor: trail.color }}
        />
      ))}

      {/* Neon lines connecting cards */}
      <svg className="absolute inset-0 -z-5 pointer-events-none">
        {hoveredCard !== null &&
          cardRefs.current.map((cardEl, idx) => {
            if (!cardEl || idx === hoveredCard) return null;
            const hoveredEl = cardRefs.current[hoveredCard];
            if (!hoveredEl) return null;

            const rect1 = hoveredEl.getBoundingClientRect();
            const rect2 = cardEl.getBoundingClientRect();
            const x1 = rect1.left + rect1.width / 2;
            const y1 = rect1.top + rect1.height / 2;
            const x2 = rect2.left + rect2.width / 2;
            const y2 = rect2.top + rect2.height / 2;

            return (
              <line
                key={idx}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={`hsl(${Math.random() * 360},100%,70%)`}
                strokeWidth={2}
                strokeLinecap="round"
                className="animate-line"
              />
            );
          })}
      </svg>

      <header className="text-center py-10 relative z-10">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00fff7] via-[#ff00ff] to-[#ff0055] animate-pulseText">
          Playloop — Daily Games
        </h1>
        <p className="mt-3 text-lg text-[#9f9f9f]">
          Word games, puzzles, pets — fresh content every day.
        </p>
      </header>

      <main className="grid md:grid-cols-3 gap-8 px-6 md:px-12 pb-12 relative z-10">
        {games.map((game, idx) => (
          <section
            key={game.title}
            ref={game.ref}
            className={`card bg-[#1f1b2e]/80 backdrop-blur-md rounded-2xl shadow-lg border-2 relative overflow-hidden transition-all duration-300
        hover:scale-105 hover:shadow-[0_0_60px_#fff] hover:animate-pulseBorder
        ${game.title === 'Virtual Pet' ? 'col-span-3 md:col-span-3 h-[80vh] flex flex-col items-center justify-center p-6' : ''}
      `}
            style={{ borderColor: game.color }}
            onMouseEnter={() => setHoveredCard(idx)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <img
              src={game.img}
              alt={game.title}
              className="absolute top-0 right-0 w-32 h-32 opacity-20 animate-float"
            />
            <h2
              className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-neon"
              style={{ color: game.color }}
            >
              {game.title}
            </h2>

            <div className="w-full h-full flex justify-center items-center">
              <div className="w-full h-full max-w-4xl max-h-[70vh]  rounded-2xl p-6 flex flex-col items-center justify-between shadow-lg">
                {game.component}
              </div>
            </div>
          </section>
        ))}
      </main>

      <footer className="text-center py-6 border-t border-[#333] text-[#888] relative z-10">
        <small>Built for Hackathon — swap localStorage for Devvit KV when ready.</small>
      </footer>

      <style jsx>{`
        @keyframes pulseBorder {
          0%,
          100% {
            box-shadow: 0 0 10px 0px currentColor;
          }
          50% {
            box-shadow: 0 0 25px 8px currentColor;
          }
        }
        .animate-pulseBorder {
          animation: pulseBorder 1.2s infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px) rotate(5deg);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes pulseText {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        .animate-pulseText {
          animation: pulseText 2s infinite;
        }

        .drop-shadow-neon {
          text-shadow:
            0 0 5px currentColor,
            0 0 10px currentColor,
            0 0 20px currentColor;
        }

        @keyframes moveGrid {
          0% {
            background-position:
              0 0,
              0 0;
          }
          100% {
            background-position:
              50px 50px,
              50px 50px;
          }
        }
        @keyframes particle {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) scale(1.3);
            opacity: 1;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 0.7;
          }
        }
        .animate-particle {
          animation: particle 4s infinite ease-in-out;
        }

        @keyframes trail {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(2) translateY(-20px);
            opacity: 0;
          }
        }
        .animate-trail {
          animation: trail 0.4s ease-out forwards;
        }

        @keyframes lineGlow {
          0% {
            stroke-opacity: 0.2;
          }
          50% {
            stroke-opacity: 1;
          }
          100% {
            stroke-opacity: 0.2;
          }
        }
        .animate-line {
          animation: lineGlow 1s infinite;
        }
      `}</style>
    </div>
  );
}

export default App;
