'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { calculateTokens } from '@/lib/calculateTokens';
import { discordRoles } from '@/lib/constants';

export default function Home() {
  const [stars, setStars] = useState(0);
  const [proofs, setProofs] = useState(0);
  const [stage25, setStage25] = useState(false);
  const [kaitoRank, setKaitoRank] = useState<number | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [total, setTotal] = useState<number | null>(null);

  const toggleRole = (value: string) => {
    setSelectedRoles((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const getKaitoReward = (rank: number | null) => {
    if (!rank) return 0;
    if (rank <= 10) return 500;
    if (rank <= 50) return 300;
    if (rank <= 100) return 200;
    if (rank <= 250) return 125;
    if (rank <= 500) return 80;
    if (rank <= 750) return 40;
    if (rank <= 1000) return 20;
    return 0;
  };

  const handleCalculate = () => {
    let totalTokens = calculateTokens(stars, proofs);

    if (stage25) totalTokens += 10000;

    selectedRoles.forEach((roleValue) => {
      const role = discordRoles.find((r) => r.value === roleValue);
      if (role) totalTokens += role.tokens;
    });

    totalTokens += getKaitoReward(kaitoRank);
    setTotal(totalTokens);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 bg-gradient-to-br from-slate-900 to-slate-700 text-white">
      <h1 className="text-3xl font-bold">Succinct Airdrop Checker</h1>

      <div className="flex flex-col gap-4 w-full max-w-md">

        <label>
          ⭐️ Stage 1 Stars
          <input
            type="number"
            className="w-full mt-1 p-2 rounded bg-slate-800 border border-slate-600"
            value={stars}
            onChange={(e) => setStars(Number(e.target.value))}
          />
        </label>

        <label>
          🔍 Stage 2 Proofs
          <input
            type="number"
            className="w-full mt-1 p-2 rounded bg-slate-800 border border-slate-600"
            value={proofs}
            onChange={(e) => setProofs(Number(e.target.value))}
          />
        </label>

        <div>
          <p className="mb-2 font-semibold">💬 Discord Roles</p>
          <div className="grid grid-cols-2 gap-2">
            {discordRoles.map((role) => (
              <button
                key={role.value}
                onClick={() => toggleRole(role.value)}
                className={`p-2 rounded border text-left ${
                  selectedRoles.includes(role.value)
                    ? 'bg-green-600 border-green-400'
                    : 'bg-slate-800 border-slate-600'
                }`}
              >
                {selectedRoles.includes(role.value) ? '✅' : '⬜'} {role.label}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={stage25}
            onChange={(e) => setStage25(e.target.checked)}
          />
          ✅ Included in Stage 2.5 (10,000 tokens)
        </label>

        <label>
          🧠 Kaito Rank (1–1000)
          <input
            type="number"
            className="w-full mt-1 p-2 rounded bg-slate-800 border border-slate-600"
            value={kaitoRank ?? ''}
            onChange={(e) => setKaitoRank(Number(e.target.value))}
          />
        </label>

        <button
          onClick={handleCalculate}
          className="mt-4 p-2 bg-green-600 hover:bg-green-500 rounded text-white font-semibold"
        >
          Calculate
        </button>
      </div>

      {total !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-4 bg-slate-800 rounded-lg shadow text-xl"
        >
          🎉 Estimated Airdrop: <strong>{total.toFixed(2)} $PROVE</strong>
        </motion.div>
      )}
    </main>
  );
}
