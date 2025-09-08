import React, { useEffect, useState } from "react";

const STORAGE_KEY = "playloop:virtualpet";

type PetState = {
  lastDate: string;
  happiness: number;
  fedTimes: number;
  level: number;
  xp: number;
};

const defaultPet: PetState = {
  lastDate: new Date().toISOString().slice(0, 10),
  happiness: 70,
  fedTimes: 0,
  level: 1,
  xp: 0
};

function loadPet(): PetState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPet;
    const parsed = JSON.parse(raw) as PetState;

    const today = new Date().toISOString().slice(0, 10);
    if (parsed.lastDate !== today) {
      parsed.lastDate = today;
      parsed.fedTimes = 0;
      parsed.happiness = Math.max(40, parsed.happiness - 8);
      parsed.xp = Math.max(0, parsed.xp - 10);
      if (parsed.xp === 0 && parsed.level > 1) parsed.level -= 1;
    }
    return parsed;
  } catch {
    return defaultPet;
  }
}

function savePet(p: PetState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

function xpNeededForLevel(level: number) {
  return 50 + level * 10; // XP needed increases per level
}

function getEmoji(happiness: number) {
  if (happiness > 70) return "😊";
  if (happiness >= 40) return "😐";
  return "☹️";
}

function getPetStage(level: number) {
  if (level <= 10) return "🐾 Baby";
  if (level <= 50) return "🐶 Teen";
  return "🐕 Adult";
}

export default function VirtualPet() {
  const [pet, setPet] = useState<PetState>(loadPet());
  const [msg, setMsg] = useState("");

  useEffect(() => savePet(pet), [pet]);

  function feed() {
    let newXP = pet.xp + 10; // XP per feed
    let newLevel = pet.level;

    // ✅ Corrected Level-Up Logic: carry leftover XP
    while (newXP >= xpNeededForLevel(newLevel) && newLevel < 100) {
      newXP -= xpNeededForLevel(newLevel);
      newLevel++;
    }

    const next = {
      ...pet,
      fedTimes: pet.fedTimes + 1, // still tracking, but not limiting
      happiness: Math.min(100, pet.happiness + 10),
      xp: newXP,
      level: newLevel
    };

    setPet(next);
    setMsg(`Yum! +10 XP, +10 happiness`);
  }

  function play() {
    const dec = Math.random() > 0.3 ? 8 : 5;
    const next = { ...pet, happiness: Math.min(100, pet.happiness + dec) };
    setPet(next);
    setMsg("That was fun! +" + dec + " happiness");
  }

  function petNap() {
    const next = { ...pet, happiness: Math.max(0, pet.happiness - 5) };
    setPet(next);
    setMsg("Pet took a nap — restful but quiet (-5 happiness)");
  }

  const xpPercent = (pet.xp / xpNeededForLevel(pet.level)) * 100;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 12,
            background: "#052018",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28
          }}
        >
          {getEmoji(pet.happiness)}
        </div>
        <div>
          <div style={{ fontWeight: 700 }}>Lantern</div>
          <div className="small-muted">Happiness: {pet.happiness}%</div>
          <div className="small-muted">Fed today: {pet.fedTimes}</div>
          <div className="small-muted">Level: {pet.level}</div>
          <div className="small-muted">{getPetStage(pet.level)}</div>
        </div>
      </div>

      {/* XP Progress Bar */}
      <div style={{ marginTop: 12, width: "100%", background: "#eee", borderRadius: 8 }}>
        <div
          style={{
            width: `${xpPercent}%`,
            height: 10,
            background: "linear-gradient(90deg,#4caf50,#81c784)",
            borderRadius: 8,
            transition: "width 0.3s ease"
          }}
        ></div>
      </div>
      <small className="small-muted">
        XP: {pet.xp} / {xpNeededForLevel(pet.level)}
      </small>

      {/* Buttons */}
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button className="button" onClick={feed}>
          Feed 🍖
        </button>
        <button className="button" onClick={play}>
          Play 🎾
        </button>
        <button className="button secondary" onClick={petNap}>
          Nap 😴
        </button>
      </div>

      <div className="status" style={{ marginTop: 8 }}>
        {msg}
      </div>

      <div style={{ marginTop: 12 }}>
        <small className="small-muted">Tip: pet care resets each day.</small>
      </div>
    </div>
  );
}
