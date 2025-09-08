import React, { useEffect, useState } from "react";

const STORAGE_KEY = "playloop:virtualpet";

// --- Types ---
type PetType = "Cat" | "Dog" | "Dragon" | "Fox";

type PetDefinition = {
  name: string;
  type: PetType;
  baseHappiness: number;
  baseXP: number;
  likedFoods: string[];
  abilities: string[];
  emoji: string; // new emoji field
};

type PetState = {
  petDef: PetDefinition;
  name: string;
  happiness: number;
  xp: number;
  level: number;
};

type Food = {
  id: string;
  name: string;
  xp: number;
  happiness: number;
};

// --- Sample Data ---
const PETS: PetDefinition[] = [
  { name: "Lantern", type: "Dog", baseHappiness: 70, baseXP: 0, likedFoods: ["Bone", "Meat"], abilities: ["Play Boost"], emoji: "🐶" },
  { name: "Spark", type: "Cat", baseHappiness: 60, baseXP: 0, likedFoods: ["Fish", "Milk"], abilities: ["Nap Bonus"], emoji: "🐱" },
  { name: "Blaze", type: "Dragon", baseHappiness: 80, baseXP: 0, likedFoods: ["Meat", "Fireberry"], abilities: ["XP Surge"], emoji: "🐉" },
];

const INVENTORY: Food[] = [
  { id: "f1", name: "Bone", xp: 10, happiness: 10 },
  { id: "f2", name: "Fish", xp: 12, happiness: 8 },
  { id: "f3", name: "Milk", xp: 8, happiness: 10 },
  { id: "f4", name: "Meat", xp: 15, happiness: 12 },
  { id: "f5", name: "Fireberry", xp: 20, happiness: 15 },
];

// --- Helper Functions ---
function xpNeededForLevel(level: number) {
  return 50 + level * 10;
}

function savePet(p: PetState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

function loadPet(): PetState | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  return JSON.parse(raw) as PetState;
}

function getEmoji(happiness: number) {
  if (happiness > 70) return "😊";
  if (happiness >= 40) return "😐";
  return "☹️";
}

// --- Main Component ---
export default function VirtualPet() {
  const [pet, setPet] = useState<PetState | null>(loadPet());
  const [selectedPet, setSelectedPet] = useState<PetDefinition | null>(null);
  const [msg, setMsg] = useState("");
  const [inventory, setInventory] = useState(INVENTORY);

  useEffect(() => {
    if (pet) savePet(pet);
  }, [pet]);

  // --- Actions ---
  function feed(food: Food) {
    if (!pet) return;
    let xpGain = food.xp;
    let happinessGain = food.happiness;

    if (!pet.petDef.likedFoods.includes(food.name)) {
      xpGain = -5;
      happinessGain = -3;
    }

    let newXP = pet.xp + xpGain;
    let newHappiness = Math.min(100, Math.max(0, pet.happiness + happinessGain));

    let newLevel = pet.level;
    while (newXP >= xpNeededForLevel(newLevel)) {
      newXP -= xpNeededForLevel(newLevel);
      newLevel++;
    }

    setPet({ ...pet, xp: newXP, level: newLevel, happiness: newHappiness });
    setMsg(`Fed ${food.name}: ${xpGain} XP, ${happinessGain} happiness`);
  }

  function play() {
    if (!pet) return;
    const gain = Math.random() > 0.3 ? 8 : 5;
    setPet({ ...pet, happiness: Math.min(100, pet.happiness + gain) });
    setMsg(`Played! +${gain} happiness`);
  }

  function rename(newName: string) {
    if (!pet) return;
    setPet({ ...pet, name: newName });
  }

  function choosePet(p: PetDefinition) {
    const initialPet: PetState = {
      petDef: p,
      name: p.name,
      happiness: p.baseHappiness,
      xp: p.baseXP,
      level: 1,
    };
    setPet(initialPet);
    setSelectedPet(p);
    setMsg(`You adopted ${p.name}!`);
  }

  // --- Pet Selection Screen ---
  if (!pet || !selectedPet) {
    return (
      <div style={{ padding: 24, textAlign: "center" }}>
        <h2 style={{ fontSize: 32, marginBottom: 16 }}>Choose Your Pet</h2>
        <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "nowrap", overflowX: "auto", paddingBottom: 12 }}>
          {PETS.map((p) => (
            <div
              key={p.name}
              style={{
                border: "3px solid #4caf50",
                padding: 20,
                borderRadius: 16,
                width: 180,
                background: "#f9f9f9",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                flexShrink: 0,
              }}
            >
              <div style={{ fontSize: 64 }}>{p.emoji}</div>
              <div style={{ fontWeight: 700, marginTop: 8 }}>{p.name}</div>
              <div style={{ fontStyle: "italic", color: "#555" }}>{p.type}</div>
              <div style={{ marginTop: 8 }}>Abilities: {p.abilities.join(", ")}</div>
              <button
                style={{
                  marginTop: 12,
                  padding: "8px 16px",
                  borderRadius: 8,
                  border: "none",
                  background: "#4caf50",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
                onClick={() => choosePet(p)}
              >
                Adopt
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- Pet Dashboard ---
  const xpPercent = (pet.xp / xpNeededForLevel(pet.level)) * 100;

  return (
    <div style={{ padding: 24, maxWidth: 1050, margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ fontSize: 32, textAlign: "center" }}>Your Pet</h2>
      <div style={{ display: "flex", gap: 24, border: "#e0f7fa",borderWidth: 1, padding: 20, borderRadius: 16, boxShadow: "0 4px 12px rgba(0,0,0,0.2)", alignItems: "center" }}>
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: 16,
           
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 72,
            color: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
          }}
        >
          {pet.petDef.emoji}
        </div>
        <div style={{ flex: 1 }}>
          <div>
            <strong>Name: </strong>
            <input
              value={pet.name}
              onChange={(e) => rename(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border: "2px solid #4caf50",
                fontSize: 20,
                width: "100%"
              }}
            />
          </div>
          <div style={{ marginTop: 12, fontSize: 20 }}>Happiness: {pet.happiness}%</div>
          <div style={{ marginTop: 8, fontSize: 20 }}>Level: {pet.level}</div>
        </div>
      </div>

      {/* XP Bar */}
      <div style={{ marginTop: 20, background: "#ccc", borderRadius: 12, height: 24, overflow: "hidden" }}>
        <div
          style={{
            width: `${xpPercent}%`,
            height: "100%",
            background: "linear-gradient(90deg,#ffeb3b,#ffc107)",
            transition: "width 0.3s ease"
          }}
        />
      </div>
      <div style={{ textAlign: "center", marginTop: 4 }}>XP: {pet.xp} / {xpNeededForLevel(pet.level)}</div>

      {/* Pet Abilities Panel */}
      <h3 style={{ marginTop: 24, textAlign: "center", fontSize: 24 }}>Pet Abilities</h3>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        {pet.petDef.abilities.map((ability) => (
          <div
            key={ability}
            style={{
              padding: "12px 20px",
              borderRadius: 12,
              border: "2px solid #3f51b5",
              background: "#c5cae9",
              fontWeight: "bold",
              fontSize: 16,
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
            }}
          >
            {ability}
          </div>
        ))}
      </div>

      {/* Inventory */}
      <h3 style={{ marginTop: 24, textAlign: "center", fontSize: 24 }}>Inventory</h3>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        {inventory.map((f) => (
          <button
            key={f.id}
            onClick={() => feed(f)}
            style={{
              padding: "12px 20px",
              borderRadius: 12,
              border: "2px solid #ff9800",
              background: "#ffe0b2",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: 16,
              minWidth: 100,
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
            }}
          >
            {f.name}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div style={{ marginTop: 24, display: "flex", justifyContent: "center", gap: 16 }}>
        <button
          onClick={play}
          style={{
            padding: "12px 24px",
            borderRadius: 12,
            border: "none",
            background: "#4caf50",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: 18,
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
          }}
        >
          Play 🎾
        </button>
      </div>

      {/* Status */}
      <div style={{ marginTop: 16, textAlign: "center", fontSize: 18, minHeight: 24 }}>{msg}</div>
    </div>
  );
}
