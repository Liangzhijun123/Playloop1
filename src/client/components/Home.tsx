import React from 'react';
import './VirtualPet.css';

interface HomeProps {
  petName: string;
  petType: string;
}

export default function Home({ petName, petType }: HomeProps) {
  const [showHungerModal, setShowHungerModal] = React.useState(false);
  // Track active state for each feed button
  const [activeFeedIndex, setActiveFeedIndex] = React.useState<number | null>(null);

  const [showStats, setShowStats] = React.useState(false);

  const handleHungerClick = () => {
    setShowHungerModal(true);
  };

  const closeModal = () => {
    setShowHungerModal(false);
    setShowStats(false);
  };
  const handleFeedClick = (idx: number) => {
    setActiveFeedIndex(idx);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
        <div className="profile">
          <div
           className='flex justify-between items-stretch w-full px-4'
          >
            <div
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}
            >
              <div className='px-2'>{petName}</div>
              <div className='text-nowrap'>Lv: 14</div>
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
          <button className="info-button" onClick={() => setShowStats(true)}>
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
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: '20px',
                }}
              >
                <p style={{ color: 'black' }}>Food Inventory</p>
                <button onClick={closeModal} className="cancel-button">
                  <img src="/cancel.png" style={{ width: '9px', height: '8px' }} />
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto', gap: '15px' }}>
                {[...Array(6)].map((_, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '16px',
                    }}
                  >
                    <img src="/burger.png" className="burger"></img>
                    <button
                      className={`feed-button${activeFeedIndex === idx ? ' active' : ''}`}
                      onClick={() => handleFeedClick(idx)}
                    >
                      Feed
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {showStats && (
        <>
          <div className="modal-overlay">
            <div className="modal-content">
              {' '}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: '20px',
                }}
              >
                <p style={{ color: 'black' }}>Pet Stats</p>
                <button onClick={closeModal} className="cancel-button">
                  <img src="/cancel.png" style={{ width: '9px', height: '8px' }} />
                </button>
              </div>
              <p style={{ color: 'black', paddingBottom: '10px' }}>Stats</p>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  paddingBottom: '24px',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <p style={{ color: 'black' }}>Health</p>
                    <p style={{ color: 'black' }}>100%</p>
                  </div>
                  <div>
                    <div className="bar"></div>
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <p style={{ color: 'black' }}>Happiness</p>
                    <p style={{ color: 'black' }}>100%</p>
                  </div>
                  <div>
                    <div className="bar"></div>
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <p style={{ color: 'black' }}>Hunger</p>
                    <p style={{ color: 'black' }}>100%</p>
                  </div>
                  <div>
                    <div className="bar"></div>
                  </div>
                </div>
              </div>
              <p style={{ color: 'black', paddingBottom: '10px' }}>Skills</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className="skill-container">
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignContent: 'center',
                      gap: '150px',
                    }}
                  >
                    <p style={{ color: '#631C1C' }}>Claw Swap</p>
                    <div
                      style={{
                        backgroundColor: '#E264A6',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        paddingTop: '5px',
                        paddingBottom: '5px',
                        borderRadius: '10px',
                      }}
                    >
                      <p>Dmg: 15</p>
                    </div>
                  </div>
                </div>
                <div className="skill-container">
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignContent: 'center',
                      gap: '150px',
                    }}
                  >
                    <p style={{ color: '#631C1C' }}>Claw Swap</p>
                    <div
                      style={{
                        backgroundColor: '#E264A6',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        paddingTop: '5px',
                        paddingBottom: '5px',
                        borderRadius: '10px',
                      }}
                    >
                      <p>Dmg: 15</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}