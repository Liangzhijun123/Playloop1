import React, { useState } from 'react';
import './VirtualPet.css';
import Home from './Home';
import PetSelection from './PetSelection';

export default function VirtualPetDashboard() {
   
  const [petName, setPetName] = useState<string>('');
  const [Stage, setStage] = useState("home")

  const handleConfirmName = (petname:string) => {
   setStage("Home");
    setPetName(petname);
  };

  if (Stage === "Home") {
    return <Home petName={petName} petType={ 'Pet'} />;
  }
  


return(
  <><PetSelection  handleConfirmName={handleConfirmName} /></>
)
  }
