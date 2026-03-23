/**
 * colorMaps.ts
 * Central source of truth for all color → Tailwind class mappings.
 * Import from here instead of redefining per-component.
 */

/** Maps a color_tag value to a bg- class (used for card headers, experience badges, etc.) */
export const bgColorMap: Record<string, string> = {
  green: 'bg-green',
  amber: 'bg-amber',
  red:   'bg-red',
  black: 'bg-black',
};

/** Maps a color value to a bg- + text- pair (used for industry/target cards) */
export const bgTextColorMap: Record<string, string> = {
  green: 'bg-green text-white',
  amber: 'bg-amber text-black',
  red:   'bg-red text-white',
  black: 'bg-black text-white',
};

/** Maps a project type to its bg- class (pill/tag labels) */
export const typeColorMap: Record<string, string> = {
  AI:   'bg-amber',
  Web:  'bg-green',
  Data: 'bg-red',
};

/** Maps a color value to a left-border class (used in ticket/experience cards) */
export const borderLeftColorMap: Record<string, string> = {
  green: 'border-l-green',
  amber: 'border-l-amber',
  red:   'border-l-red',
  black: 'border-l-black',
};

/** Maps a color value to a border- class (used in skill category cards) */
export const borderColorMap: Record<string, string> = {
  green: 'border-green',
  amber: 'border-amber',
  red:   'border-red',
  black: 'border-black',
};