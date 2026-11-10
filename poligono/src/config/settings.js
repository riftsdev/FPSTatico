import { load, save } from '../utils/storage.js';

export const DEFAULTS = Object.freeze({
  sensX: 1, sensY: 1, invertY: false,
  fov: 75, renderScale: 1, shadows: true, showFps: true,
});

export const settings = { ...DEFAULTS, ...load('settings', {}) };
export const saveSettings = () => save('settings', settings);
