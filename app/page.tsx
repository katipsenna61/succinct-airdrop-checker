"use client";

import { useState } from "react";
import { calculateTokens } from "../lib/calculateTokens";
import { discordRoles } from "../lib/constants";
import { motion } from "framer-motion";

export default function Home() {
  const [stars, setStars] = useState(0);
  const [proofs, setProofs] = useState(0);
  const [stage25, setStage25] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleCheckboxChange = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role)
        ? prev.filter((r) => r !== role)
        : [...prev, role]
    );
  };

  const handleCalculate = () => {
    const result = calculateTokens(stars, proofs, stage25, selectedRoles);
    setTotal(result);
    setShowResult(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <div className="max-w-xl w-full bg-slate-800 rounded-2xl shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center">Succinct Airdrop Checker</h1>

        <div className="space-y-2">
          <label>⭐️ Stage 1 Stars</label>
          <input
            type="number"
            value={stars}
            onChange={(e) => setStars(Number(e.target.value))}
            className="w-full p-2 rounded bg-slate-700 text-white"
          />

          <label>📜 Stage 2 Proofs</label>
          <input
            type="number"
            value={proofs}
            onChange={(e) => setProofs(Number(e.target.value))}
            className="w-full p-2 rounded bg-slate-700 text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg mt-4">🎖 Discord Roles</label>
          <div className="grid grid-cols-2 gap-2">
            {discordRoles.map((role) => (
              <label
                key={role}
                className={`flex items-center space-x-2 p-2 rounded border ${
                  selectedRoles.includes(role)
                    ? "bg-green-700 border-green-400"
                    : "bg-slate-700 border-slate-600"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedRoles.includes(role)}
                  onChange={() => handleCheckboxChange(role)}
                />
                <span>{selectedRoles.includes(role) ? "✅" : "⬜"} {role}</span>
              </label>
            ))}
          </div>

          <label className="flex items-center space-x-2 mt-4">
            <input
              type="checkbox"
              checked={stage25}
              onChange={() => setStage25(!stage25)}
            />
            <span>🚀 Included in Stage 2.5</span>
          </label>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition"
        >
          Calculate Airdrop
        </button>

        {showResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center mt-4 text-xl font-semibold"
          >
            You’ll receive approximately: <br />
            <span className="text-green-400 text-3xl">{total.toLocaleString()} $PROVE</span>
          </motion.div>
        )}
      </div>
    </main>
  );
}