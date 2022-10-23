/** Returns the closest number to x within the min/max bounds */
export const clamp = (x: number, min: number, max: number) =>
	Math.min(max, Math.max(min, x))
