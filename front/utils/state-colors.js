const COLORS = ["info", "primary", "warning", "error", "success", "dark"];

export function getColor(id = 0) {
  return COLORS[id % COLORS.length];
}
