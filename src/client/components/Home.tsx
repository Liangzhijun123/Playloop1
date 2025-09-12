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
        return <Shop />;
      case 'story':
        return <div style={{ color: 'white', padding: '20px' }}>Story content coming soon...</div>;
      case 'chat':
        return <div style={{ color: 'white', padding: '20px' }}>Chat content coming soon...</div>;
      default:
        return (
          <>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '32px',
              }}
            >
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
        <div className="flex w-full flex-col mx-10 my-5 gap-4 profile p-2">
          <div className="px-2 flex w-full justify-between">
            <div className=" flex w-auto gap-2">
              <p>{petName}</p>
              <p className="text-nowrap">Lv: 14</p>
            </div>
            <div className=" flex w-auto gap-2">
              <img src="/cash.png" style={{ width: '24px', height: '18px' }} />
              <p>$1000</p>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}
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

      <div
        style={{
          width: '357px',
          height: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      ></div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '32px',
          gap: '32px',
        }}
      >
        <div className="home-bar">
          <img src="/heart.png" style={{ width: '32px', height: '37px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', gap: '4px' }}>
            <p style={{ color: 'white' }}>Health bar</p>
            <div
              style={{
                width: '104px',
                height: '2px',
                border: '5px solid #CB911B',
                borderRadius: '10px',
              }}
            ></div>
          </div>
        </div>
        <div className="home-bar">
          <img src="/achievement.png" style={{ width: '20px', height: '20px' }} />

          <p style={{ color: 'white' }}>Achievements</p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
        {' '}
        <div className="pet-image">
          <img src="/cat.png" style={{ width: '221px', height: '241px' }} />
          <button>
            <img
              src="/info.png"
              style={{
                width: '35px',
                height: '34px',
                position: 'absolute',
                top: '0px',
                right: '10px',
              }}
            />
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
        <button></button>
      </div>
    </div>
  );
}
