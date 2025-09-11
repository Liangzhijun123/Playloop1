import React, { useState } from 'react';
import './VirtualPet.css';

export default function VirtualPetDashboard() {
  const [selectedPet, setSelectedPet] = useState<string | null>(null);
  const [petName, setPetName] = useState<string>('');

  const handleConfirmName = () => {
    if (petName.trim() !== '') {
      alert(`Your ${selectedPet} is named ${petName}!`);
      // Proceed to next screen or logic
    }
  };

  if (selectedPet) {
    // Pet naming screen
    return (
      <div className='background'>
        <p className='titles'>Welcome to virtual pet game!</p>
        <p style={{ color: 'white' }}>Name your {selectedPet}</p>
        <input
          type='text'
          placeholder='Enter pet name...'
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
        />
        <button className='button-choose' onClick={handleConfirmName}>
          Confirm
        </button>
      </div>
    );
  }

  // Pet selection screen
  return (
    <div className='background'>
      <p className='titles'>Welcome to virtual pet game!</p>
      <p style={{ color: 'white' }}>Choose a pet</p>

      <div className='choose-pet'>
        {[1, 2, 3, 4].map((_, index) => (
          <div
            key={index}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
          >
            <img src='/egg.png' style={{ width: '76px', height: '94px' }} />
            <button className='button-choose' onClick={() => setSelectedPet(`Pet ${index + 1}`)}>
              Choose
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
