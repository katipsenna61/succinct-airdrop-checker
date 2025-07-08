export function calculateTokens(stars: number, proofs: number): number {
  const STAR_REWARD = 0.3; // örnek katsayı
  const PROOF_REWARD = 50; // örnek katsayı

  return stars * STAR_REWARD + proofs * PROOF_REWARD;
}
