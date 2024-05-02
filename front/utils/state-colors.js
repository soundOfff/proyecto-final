const COLORS = ["info", "primary", "warning", "error", "success", "dark"];

// TODO: make cyclic array of colors sending an id.
export function getColor(id = 0) {
  return COLORS[id % COLORS.length];
}
