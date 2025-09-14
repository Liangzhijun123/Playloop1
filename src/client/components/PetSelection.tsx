import React, { Dispatch, useState } from 'react';
export default function PetSelection({handleConfirmName,}:{handleConfirmName: (petname:string) => void ,}) {
  const [stage, setStage] = useState(0);

  const [petName, setpetName] = useState("")


  return (<>{
    stage == 0 ? <div className='background' >
      <p className='titles' > Welcome to virtual pet game! </p>
      < p style={{ color: 'white' }
      }> Choose a pet </p>

      < div className='choose-pet' >
        {
          [1, 2, 3, 4].map((_, index) => (
            <div
              key={index}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
            >
              <img src='/egg.png' style={{ width: '76px', height: '94px' }} />
              < button className='button-choose' onClick={() => setStage(1)}>
                Choose
              </button>
            </div>
          ))}
      </div>
    </div> : <div className='background'>
      <p className='titles'>Welcome to virtual pet game!</p>
      <p style={{ color: 'white' }}>Name your pet</p>
      <input
        type='text'
        placeholder='Enter pet name...'
        value={petName}
        onChange={(e) => setpetName(e.target.value)}
        className='input-name'
      />
      <button className='button-choose' onClick={() => handleConfirmName(petName)}>

        Confirm
      </button>
    </div>

  }</>);

  // return (</>
  //   { stage == 0 ? 
  //     : <>  </>}</>     );
}
