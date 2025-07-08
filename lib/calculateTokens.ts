export function calculateTokens(stars: number, proofs: number): number {
  const tokenPerStar = 75_000_000 / 259_640_385; // ≈ 0.2888
  const tokenPerProof = 20_000_000 / 79_290;     // ≈ 252.27

  return stars * tokenPerStar + proofs * tokenPerProof;
}
