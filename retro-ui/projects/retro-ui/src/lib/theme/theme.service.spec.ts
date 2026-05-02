import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [ThemeService],
    });

    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should default to classic-amber theme, light mode and amber accent', () => {
    expect(service.currentTheme()).toBe('classic-amber');
    expect(service.displayMode()).toBe('light');
    expect(service.accent()).toBe('amber');
    expect(service.isDark()).toBe(false);
  });

  it('should toggle mode between light and dark', () => {
    service.toggleMode();
    expect(service.displayMode()).toBe('dark');
    expect(service.isDark()).toBe(true);

    service.toggleMode();
    expect(service.displayMode()).toBe('light');
    expect(service.isDark()).toBe(false);
  });

  it('should set mode explicitly', () => {
    service.setMode('dark');
    expect(service.displayMode()).toBe('dark');
  });

  it('should set accent explicitly', () => {
    service.setAccent('green');
    expect(service.accent()).toBe('green');
  });

  it('should set theme explicitly', () => {
    service.setTheme('synthwave');
    expect(service.currentTheme()).toBe('synthwave');
  });

  it('should persist theme, mode and accent to localStorage', () => {
    service.setTheme('dark-amber');
    service.setMode('dark');
    service.setAccent('cyan');

    expect(localStorage.getItem('retro-ui-theme')).toBe('dark-amber');
    expect(localStorage.getItem('retro-ui-mode')).toBe('dark');
    expect(localStorage.getItem('retro-ui-accent')).toBe('cyan');
  });

  it('should restore config from localStorage on init', () => {
    localStorage.setItem('retro-ui-theme', 'synthwave');
    localStorage.setItem('retro-ui-mode', 'dark');
    localStorage.setItem('retro-ui-accent', 'green');

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: [ThemeService] });
    const restored = TestBed.inject(ThemeService);

    expect(restored.currentTheme()).toBe('synthwave');
    expect(restored.displayMode()).toBe('dark');
    expect(restored.accent()).toBe('green');
  });

  it('should fallback to defaults when localStorage has invalid values', () => {
    localStorage.setItem('retro-ui-theme', 'invalid-theme');
    localStorage.setItem('retro-ui-mode', 'invalid-mode');
    localStorage.setItem('retro-ui-accent', 'invalid-accent');

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: [ThemeService] });
    const restored = TestBed.inject(ThemeService);

    expect(restored.currentTheme()).toBe('classic-amber');
    expect(restored.displayMode()).toBe('light');
    expect(restored.accent()).toBe('amber');
  });

  it('should expose config computed with all values', () => {
    service.setMode('dark');
    service.setAccent('cyan');
    service.setTheme('phosphor-green');

    expect(service.config()).toEqual({
      theme: 'phosphor-green',
      mode: 'dark',
      accent: 'cyan',
      isDark: true,
    });
  });
});
