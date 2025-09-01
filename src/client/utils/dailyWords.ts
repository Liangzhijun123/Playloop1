export const WORDS_POOL = [
  "apple","banana","cherry","dragon","eagle","forest","galaxy","horizon",
  "island","jungle","kettle","legend","monkey","nebula","ocean","puzzle",
  "quartz","rocket","sunset","thunder","unicorn","victory","wander","xenial","yonder","zephyr"
];

export function pickWordForDate(dateStr?: string) {
  // dateStr format 'YYYY-MM-DD' (if missing, use today)
  const d = dateStr ?? new Date().toISOString().slice(0,10);
  // simple deterministic index using string char codes:
  let seed = 0;
  for (let i=0;i<d.length;i++) seed = (seed * 31 + d.charCodeAt(i)) >>> 0;
  const idx = seed % WORDS_POOL.length;
  return WORDS_POOL[idx];
}
