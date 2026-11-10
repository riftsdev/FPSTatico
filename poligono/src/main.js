import './ui/style.css';
import { Game } from './core/Game.js';
import { initUI } from './ui/Menu.js';

const game = new Game(document.getElementById('game'));
initUI(game);

// Evita zoom, menu de contexto e rolagem acidentais no celular.
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('gesturestart', (e) => e.preventDefault());
document.addEventListener('touchmove', (e) => { if (!e.target.closest('.panel')) e.preventDefault(); }, { passive: false });
