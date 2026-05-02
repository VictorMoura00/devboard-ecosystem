import { DOCUMENT } from '@angular/common';
import { computed, effect, inject, Injectable, signal } from '@angular/core';

import { APP_THEMES, DisplayMode, RetroThemeName, RETRO_THEMES } from './theme.model';

const STORAGE_KEY = 'retro-ui-theme';
const MODE_STORAGE_KEY = 'retro-ui-mode';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  readonly themes = APP_THEMES;

  readonly currentTheme = signal<RetroThemeName>('classic-amber');
  readonly displayMode = signal<DisplayMode>('light');

  /** Computed: is the current mode dark? */
  readonly isDark = computed(() => this.displayMode() === 'dark');

  constructor() {
    this._restoreFromStorage();

    effect(() => {
      const root = this.document.documentElement;
      root.dataset['theme'] = this.currentTheme();
      root.dataset['mode'] = this.displayMode();
      root.dataset['colorScheme'] = this.isDark() ? 'dark' : 'light';
    });
  }

  setTheme(theme: RetroThemeName): void {
    this.currentTheme.set(theme);
    this._saveToStorage();
  }

  setMode(mode: DisplayMode): void {
    this.displayMode.set(mode);
    this._saveToStorage();
  }

  toggleMode(): void {
    this.displayMode.update(m => m === 'dark' ? 'light' : 'dark');
    this._saveToStorage();
  }

  private _restoreFromStorage(): void {
    try {
      const storedTheme = localStorage.getItem(STORAGE_KEY);
      const storedMode = localStorage.getItem(MODE_STORAGE_KEY);

      if (storedTheme && RETRO_THEMES.some(t => t.name === storedTheme)) {
        this.currentTheme.set(storedTheme as RetroThemeName);
      }
      if (storedMode === 'dark' || storedMode === 'light') {
        this.displayMode.set(storedMode as DisplayMode);
      }
    } catch {
      // localStorage may be unavailable
    }
  }

  private _saveToStorage(): void {
    try {
      localStorage.setItem(STORAGE_KEY, this.currentTheme());
      localStorage.setItem(MODE_STORAGE_KEY, this.displayMode());
    } catch {
      // localStorage may be unavailable
    }
  }
}
