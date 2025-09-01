import React, { useEffect, useState } from "react";

const STORAGE_KEY = "playloop:virtualpet";

type PetState = {
  lastDate: string;
  happiness: number; // 0..100
  fedTimes: number;
}

const defaultPet: PetState = {
  lastDate: new Date().toISOString().slice(0,10),
  happiness: 70,
  fedTimes: 0
};

function loadPet(): PetState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPet;
    const parsed = JSON.parse(raw) as PetState;
    // reset at day boundary
    const today = new Date().toISOString().slice(0,10);
    if (parsed.lastDate !== today) {
      parsed.lastDate = today;
      parsed.fedTimes = 0;
      // small happiness decay each new day
      parsed.happiness = Math.max(40, parsed.happiness - 8);
    }
    return parsed;
  } catch {
    return defaultPet;
  }
}

function savePet(p: PetState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

export default function VirtualPet() {
  const [pet, setPet] = useState<PetState>(loadPet());
  const [msg, setMsg] = useState("");

  useEffect(()=> savePet(pet), [pet]);

  function feed() {
    // can feed up to 3 times/day
    if (pet.fedTimes >= 3) { setMsg("Already fed enough today!"); return; }
    const next = { ...pet, fedTimes: pet.fedTimes + 1, happiness: Math.min(100, pet.happiness + 10) };
    setPet(next); setMsg("Yum! +10 happiness");
  }

  function play() {
    const dec = Math.random() > 0.3 ? 8 : 5;
    const next = { ...pet, happiness: Math.min(100, pet.happiness + dec) };
    setPet(next); setMsg("That was fun! +" + dec + " happiness");
  }

  function petNap() {
    const next = { ...pet, happiness: Math.max(0, pet.happiness - 5) };
    setPet(next); setMsg("Pet took a nap — restful but quiet (-5 happiness)");
  }

  return (
    <div>
      <div style={{display:"flex", alignItems:"center", gap:12}}>
        <div style={{width:80,height:80, borderRadius:12, background:"#052018", display:"flex",alignItems:"center",justifyContent:"center", fontSize:28}}>
          🐾
        </div>
        <div>
          <div style={{fontWeight:700}}>Lantern</div>
          <div className="small-muted">Happiness: {pet.happiness}%</div>
          <div className="small-muted">Fed today: {pet.fedTimes} / 3</div>
        </div>
      </div>

      <div style={{display:"flex", gap:8, marginTop:12}}>
        <button className="button" onClick={feed}>Feed</button>
        <button className="button" onClick={play}>Play</button>
        <button className="button secondary" onClick={petNap}>Nap</button>
      </div>

      <div className="status" style={{marginTop:8}}>{msg}</div>

      <div style={{marginTop:12}}>
        <small className="small-muted">Tip: pet care resets (action limits) each day.</small>
      </div>
    </div>
  );
}
