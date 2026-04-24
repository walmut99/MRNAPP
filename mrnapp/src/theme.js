import { Platform } from 'react-native';

// ─── Colours ──────────────────────────────────────────────────────────────────
// Source: Section 4 of MRN_Specification.md, confirmed against mrn.html :root

export const colors = {
  // Primary palette
  accent:             '#1D9E75',
  accentLight:        '#E1F5EE',
  accentDark:         '#085041',

  // Text
  textPrimary:        '#1A1A18',
  textSecondary:      '#888780',

  // Surfaces
  backgroundPrimary:  '#FFFFFF',
  backgroundSecondary:'#F5F5F3',

  // Borders / dividers
  borderTertiary:     '#E8E8E6',

  // Semantic — blood marker status
  danger:             '#A32D2D',
  dangerLight:        '#FCEBEB',
  warn:               '#854F0B',
  warnLight:          '#FAEEDA',
  borderline:         '#185FA5',
  borderlineLight:    '#E6F1FB',
};

// ─── Macro arc colours ────────────────────────────────────────────────────────
// Source: Section 5.1 (calories=green, protein=blue, fat=amber, carbs=pink)

export const macroColors = {
  calories: '#1D9E75',
  protein:  '#185FA5',
  fat:      '#C57B1F',
  carbs:    '#C9447A',
  track:    '#EEEEEC', // unfilled arc track
};

// ─── Typography ───────────────────────────────────────────────────────────────
// Source: Section 4 — Typography; HTML prototype for additional sizes

export const fontFamily = Platform.select({
  ios:     undefined,    // SF Pro (system default)
  android: 'Roboto',
  default: undefined,
});

export const fontSize = {
  hero:         32,  // body-composition numbers, key metrics
  greeting:     15,  // top-bar name
  body:         13,  // standard copy, bubble text, meal strip
  sublabel:     11,  // labels, subtitles, trend text, chip meta
  sectionLabel: 10,  // uppercase section headers
  subtab:       12,  // sub-tab bar items, macro arc values, chip text
  activityVal:  18,  // water / steps large value
  unit:         14,  // metric unit suffix next to hero number
};

export const fontWeight = {
  regular: '400',
  medium:  '500',
};

export const lineHeight = {
  tight:  1.1,   // hero metric values
  base:   1.4,   // body text
  bubble: 1.45,  // chat bubbles
};

export const letterSpacing = {
  sectionLabel: 0.7,  // 0.07em × 10px sectionLabel font size
};

// ─── Spacing ──────────────────────────────────────────────────────────────────
// Source: Section 4 — Layout principles; HTML prototype for derived values

export const spacing = {
  sectionX:     22,   // horizontal padding on all full-width sections
  sectionY:     20,   // vertical padding on sections
  sectionTight: 14,   // tighter vertical padding variant
  divider:      0.5,  // between-section separator thickness
  sectionHead:  14,   // margin-bottom below section header row
  backBarGap:   12,   // gap between back button and title
  topBarV:      14,   // top-bar vertical padding
  chatStream:   16,   // vertical padding around chat message list
  bubblePadH:   14,   // horizontal padding inside chat bubble
  bubblePadV:   10,   // vertical padding inside chat bubble
  bubbleGap:    10,   // gap between consecutive bubble rows
  chipPadH:     12,   // horizontal padding inside chips
  chipPadV:      6,   // vertical padding inside chips
  weekChipPadH: 10,   // horizontal padding inside week chip
  weekChipPadV:  5,   // vertical padding inside week chip
  subtabPadH:   10,   // horizontal padding inside sub-tab items
  subtabPadV:    8,   // vertical padding inside sub-tab items
  subtabGap:     4,   // gap between sub-tab items
  activityGap:  14,   // gap between water + steps tiles
  activityPad:  14,   // inner padding of each activity tile
  macroGap:      8,   // gap between macro arc columns
  macroArcGap:   6,   // gap between arc SVG and its label row
  flagRowPadH:  14,   // horizontal padding inside flag-row alert
  flagRowPadV:  12,   // vertical padding inside flag-row alert
  flagRowGap:    8,   // margin-bottom between consecutive flag rows
  progressThumbGap: 10, // gap between before/after photo thumbnails
  bottomNavPadBottom: 18, // extra bottom padding (home-indicator safe area)
  bottomNavPadTop:     8,
  bottomNavItemPadV:   6,
  bottomNavItemGap:    3, // gap between icon pill and label text
};

// ─── Border radii ─────────────────────────────────────────────────────────────

export const radii = {
  pill:         9999, // fully rounded — chips, week chip, bottom-nav pill, progress bars
  activityTile:   14,
  bubble:         16,
  thumb:          12, // progress photo thumbnails
  flagRow:        10,
  subtab:          8,
  waterBtn:        8,
  avatar:         999, // circular (applied as borderRadius = size / 2 preferred)
};

// ─── Component tokens ─────────────────────────────────────────────────────────
// Specific sizes referenced in the HTML prototype for shared components

export const components = {
  avatar: {
    size:   36,
    sizeLg: 64,
  },
  macroArc: {
    size: 58,  // SVG viewbox width/height
  },
  bottomNavIcon: {
    width:  54,
    height: 28,
  },
  statusDot: {
    size: 8,
  },
  progressBar: {
    height: 4,
  },
  weekChipDot: {
    size: 4,
  },
  activityTile: {
    minHeight: 148,
  },
  backBar: {
    btnSize: 32,
  },
};

// ─── Convenience re-export ────────────────────────────────────────────────────

const theme = {
  colors,
  macroColors,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  spacing,
  radii,
  components,
};

export default theme;
