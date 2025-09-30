export const capitalizeFirst = (input: string) => {
  return input.charAt(0).toUpperCase() + input.slice(1);
};

export function hexToRgba(hex: string, alpha: number = 1): string {
  // Remove # if present
  const cleanHex = hex.replace(/^#/, "");

  // Expand shorthand hex (#F57 -> #FF5577)
  const fullHex =
    cleanHex.length === 3
      ? cleanHex
          .split("")
          .map((char) => char + char)
          .join("")
      : cleanHex;

  // Validate hex format
  if (!/^[0-9A-Fa-f]{6}$/.test(fullHex)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  // Parse RGB values
  const r = parseInt(fullHex.substring(0, 2), 16);
  const g = parseInt(fullHex.substring(2, 4), 16);
  const b = parseInt(fullHex.substring(4, 6), 16);

  // Clamp alpha between 0 and 1
  const clampedAlpha = Math.max(0, Math.min(1, alpha));

  return `rgba(${r}, ${g}, ${b}, ${clampedAlpha})`;
}
