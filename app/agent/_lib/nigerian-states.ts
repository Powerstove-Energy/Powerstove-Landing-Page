/** Nigeria's 36 states and the FCT — must match NIGERIAN_STATES in the agent-reg backend. */
export const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
  'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
  'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
  'Yobe', 'Zamfara',
] as const;

export type NigerianState = (typeof NIGERIAN_STATES)[number];

/** Other ways agents type a state, keyed in lower case — mirrors the backend's aliases. */
const STATE_ALIASES: Record<string, NigerianState> = {
  abuja: 'FCT',
  'fct abuja': 'FCT',
  'abuja fct': 'FCT',
  'federal capital territory': 'FCT',
  nassarawa: 'Nasarawa',
  'akwa-ibom': 'Akwa Ibom',
  'cross-river': 'Cross River',
};

/** The stored spelling of a typed state, or null. Ignores case, extra spaces, commas and a trailing "State". */
export function matchState(value: string): NigerianState | null {
  const key = value.trim().replace(/\s+/g, ' ').replace(/,/g, '').toLowerCase().replace(/ state$/, '');
  return NIGERIAN_STATES.find((state) => state.toLowerCase() === key) ?? STATE_ALIASES[key] ?? null;
}

/** The entry in `names` matching a typed place name, ignoring case and spacing. */
export function matchPlace(names: readonly string[], value: string): string | null {
  const key = value.trim().replace(/\s+/g, ' ').toLowerCase();
  return key ? (names.find((name) => name.toLowerCase() === key) ?? null) : null;
}
