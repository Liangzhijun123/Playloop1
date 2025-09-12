import React from 'react';
import './VirtualPet.css';

interface HomeProps {
  petName: string;
  petType: string;
}

export default function Home({ petName, petType }: HomeProps) {
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

          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '100px' }}>
            <div
              style={{ width: '150px', height: '2px', border: '10px solid #CB911B', borderRadius: '10px' }}
            ></div>
            <p style={{ color: 'white' }}>0/100 xp</p>
          </div>
        </div>
      </div>
    
    <div style={{width: '357px', height: 'auto', display: 'flex', justifyContent: 'center', alignContent: 'center'}}></div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px' }}>
        <div>
            <p style={{color: 'white'}}>Health bar</p>
        </div>
      </div>
    </>
  );
}
