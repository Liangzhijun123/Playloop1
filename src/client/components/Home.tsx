import React, { useState } from 'react';
import './VirtualPet.css';
import Shop from './Shop';

interface HomeProps {
  petName: string;
  petType: string;
}

type ActiveView = 'home' | 'shop' | 'story' | 'chat';

export default function Home({ petName, petType }: HomeProps) {
  const [activeView, setActiveView] = useState<ActiveView>('home');

  // Render different views based on activeView
  const renderContent = () => {
    switch (activeView) {
      case 'shop':
        return <Shop/>;
      case 'story':
        return <div style={{ color: 'white', padding: '20px' }}>Story content coming soon...</div>;
      case 'chat':
        return <div style={{ color: 'white', padding: '20px' }}>Chat content coming soon...</div>;
      default:
        return (
          <>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px' }}>
              <div>
                <p style={{ color: 'white' }}>Health bar</p>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="home-container">
      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
        <div className="profile">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '200px',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}
            >
              <p>{petName}</p>
              <p>Lv: 14</p>
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}
            >
              <img src="/cash.png" style={{ width: '24px', height: '18px' }} />
              <p>$1000</p>
            </div>
          </div>

          <div
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '100px' }}
          >
            <div
              style={{
                width: '150px',
                height: '2px',
                border: '10px solid #CB911B',
                borderRadius: '10px',
              }}
            ></div>
            <p style={{ color: 'white' }}>0/100 xp</p>
          </div>
        </div>
      </div>
    
      <div style={{ width: '357px', height: 'auto', display: 'flex', justifyContent: 'center', alignContent: 'center' }}></div>
      
      {/* Render content based on active view */}
      {renderContent()}

      {/* Navigation Bar */}
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
