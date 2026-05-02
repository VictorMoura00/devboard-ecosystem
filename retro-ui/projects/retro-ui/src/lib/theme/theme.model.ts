export type RetroThemeName =
  | 'classic-amber'
  | 'phosphor-green'
  | 'crt-blue'
  | 'dark-amber'
  | 'synthwave'
  | 'solar-sepia';

export type DisplayMode = 'light' | 'dark';

export type AccentColor = 'amber' | 'green' | 'blue' | 'pink';

export interface RetroTheme {
  name:     RetroThemeName;
  label:    string;
  mode:     DisplayMode;
  accent:   string;
  /** Primitive palette — raw values before semantic mapping. */
  primitives: {
    desktop:       string;
    panel:         string;
    panelAlt:      string;
    sunken:        string;
    line:          string;
    lineSoft:      string;
    text:          string;
    muted:         string;
    amber:         string;
    amberBright:   string;
    phosphor:      string;
    cyan:          string;
    red:           string;
    inputBg:       string;
  };
}

export const RETRO_THEMES: RetroTheme[] = [
  {
    name: 'classic-amber', label: 'Classic Amber', mode: 'light', accent: '#ffb000',
    primitives: {
      desktop: '#c9c3b2', panel: '#d8d3c4', panelAlt: '#e4dfd0', sunken: '#b8b2a1',
      line: '#1a1a18', lineSoft: '#8f8a7a', text: '#1a1a18', muted: '#6b6b60',
      amber: '#ffb000', amberBright: '#ffd166', phosphor: '#33ff66', cyan: '#00d3ff', red: '#ff4136',
      inputBg: '#faf9f5',
    },
  },
  {
    name: 'phosphor-green', label: 'Phosphor Green', mode: 'light', accent: '#29c85f',
    primitives: {
      desktop: '#c7ccb8', panel: '#d5dbc7', panelAlt: '#e4ead8', sunken: '#aeb5a3',
      line: '#10150f', lineSoft: '#6d7467', text: '#10150f', muted: '#566051',
      amber: '#29c85f', amberBright: '#7effa3', phosphor: '#29c85f', cyan: '#4fa7c2', red: '#c44d41',
      inputBg: '#f6faef',
    },
  },
  {
    name: 'crt-blue', label: 'CRT Blue', mode: 'light', accent: '#2f7de1',
    primitives: {
      desktop: '#c6cbd0', panel: '#d7dde3', panelAlt: '#e7edf4', sunken: '#aeb7c1',
      line: '#12181f', lineSoft: '#72808f', text: '#12181f', muted: '#556270',
      amber: '#2f7de1', amberBright: '#84b5ff', phosphor: '#57c77c', cyan: '#2f7de1', red: '#c95a52',
      inputBg: '#f0f4fb',
    },
  },
  {
    name: 'dark-amber', label: 'Dark Amber', mode: 'dark', accent: '#ffb000',
    primitives: {
      desktop: '#0d1009', panel: '#141810', panelAlt: '#1e231a', sunken: '#0a0d07',
      line: '#c8c0a0', lineSoft: '#3a3a2c', text: '#d8d0b8', muted: '#928878',
      amber: '#ffb000', amberBright: '#ffd166', phosphor: '#33ff66', cyan: '#00d3ff', red: '#ff4136',
      inputBg: '#faf9f5',
    },
  },
  {
    name: 'synthwave', label: 'Synthwave', mode: 'dark', accent: '#ff2d78',
    primitives: {
      desktop: '#10091c', panel: '#16102a', panelAlt: '#211638', sunken: '#0c0616',
      line: '#d8c4f8', lineSoft: '#3a2858', text: '#ece0ff', muted: '#9676be',
      amber: '#ff2d78', amberBright: '#ff80ab', phosphor: '#00f5c8', cyan: '#00d8ff', red: '#ff3350',
      inputBg: '#f0f4fb',
    },
  },
  {
    name: 'solar-sepia', label: 'Solar Sepia', mode: 'dark', accent: '#e8a020',
    primitives: {
      desktop: '#1a1410', panel: '#221a14', panelAlt: '#2c221a', sunken: '#13100c',
      line: '#d0c090', lineSoft: '#40301c', text: '#d8c8a0', muted: '#9a8868',
      amber: '#e8a020', amberBright: '#f0c060', phosphor: '#88cc44', cyan: '#44b8cc', red: '#e05840',
      inputBg: '#f0f4fb',
    },
  },
];

/** Legacy alias for backwards compatibility. */
export type ThemeName = RetroThemeName;
export type AppTheme = RetroTheme;
export const APP_THEMES: AppTheme[] = RETRO_THEMES;
