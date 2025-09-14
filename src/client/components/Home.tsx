import React from 'react';
import './VirtualPet.css';

interface HomeProps {
  petName: string;
  petType: string;
}

export default function Home({ petName, petType }: HomeProps) {
  const [showHungerModal, setShowHungerModal] = React.useState(false);

  const handleHungerClick = () => {
    setShowHungerModal(true);
  };

  const closeModal = () => {
    setShowHungerModal(false);
  };
  return (
    <>
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

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          gap: '16px',
        }}
      >
        <button className="smile-button">
          <img src="/smile.png" style={{ width: '41px', height: '50px' }} />
        </button>
        <button className="smile-button" onClick={handleHungerClick}>
          <img src="/hunger.png" style={{ width: '41px', height: '50px' }} />
        </button>
        <button className="smile-button">
          <img src="/night.png" style={{ width: '41px', height: '50px' }} />
        </button>
        <button className="smile-button">
          <img src="/shower.png" style={{ width: '41px', height: '50px' }} />
        </button>
      </div>

      {showHungerModal && (
        <>
          <div className="modal-overlay">
            <div className="modal-content">
              <div
                style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <p style={{ color: 'black' }}>Food Inventory</p>
                <button onClick={closeModal} className="cancel-button">
                  <img src="/cancel.png" style={{ width: '9px', height: '8px' }} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
