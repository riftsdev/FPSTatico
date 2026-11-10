import { Renderer } from '../rendering/Renderer.js';
import { Input } from './Input.js';
import { PlayerController } from '../player/PlayerController.js';
import { World } from '../physics/World.js';
import { buildTrainingMap } from '../maps/TrainingMap.js';
import { settings } from '../config/settings.js';

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new Renderer(canvas);
    this.input = new Input(canvas);
    this.world = new World();
    this.map = buildTrainingMap(this.renderer.scene, this.world);
    this.player = new PlayerController(this.renderer.camera, this.world, this.input);
    this.state = 'menu';            // menu | playing | paused
    this.onStateChange = () => {};
    this.last = 0; this.t = 0; this.frames = 0; this.fpsT = 0;
    this.fpsEl = document.getElementById('fps');

    this.renderer.onLost = () => this.pause();   // o Three.js restaura o contexto sozinho
    document.addEventListener('visibilitychange', () => document.hidden && this.pause());
    document.addEventListener('pointerlockchange', () => {
      if (this.state === 'playing' && !this.input.touch && !document.pointerLockElement) this.pause();
    });
    requestAnimationFrame(this._loop);
  }

  _loop = (now) => {
    requestAnimationFrame(this._loop);
    const dt = Math.min((now - this.last) / 1000, 0.05);
    this.last = now;
    if (this.state === 'playing') {
      this.player.update(dt);
      this.input.endFrame();
      this.renderer.followSun(this.player.pos.x, this.player.pos.z);
    } else {
      // Câmera orbital de fundo no menu
      this.t += dt * 0.1;
      const c = this.renderer.camera;
      c.position.set(Math.sin(this.t) * 45, 20, Math.cos(this.t) * 45);
      c.lookAt(0, 2, 0);
      this.renderer.followSun(0, 0);
    }
    this.renderer.render();
    this._fps(dt);
  };

  _fps(dt) {
    this.frames++; this.fpsT += dt;
    if (this.fpsT >= 0.5) {
      this.fpsEl.textContent = settings.showFps ? `${Math.round(this.frames / this.fpsT)} fps` : '';
      this.frames = 0; this.fpsT = 0;
    }
  }

  setState(s) { this.state = s; this.onStateChange(s); }
  applySettings() { this.renderer.apply(); }

  start() {
    const sp = this.map.spawns;
    this.player.spawn(sp[Math.floor(Math.random() * sp.length)]);
    this.resume();
  }

  resume() {
    this.input.reset();
    this.setState('playing');
    if (this.input.touch) {
      try {   // tela cheia e orientação só funcionam onde o navegador permite (não no iPhone Safari)
        document.documentElement.requestFullscreen?.()?.catch?.(() => {});
        screen.orientation?.lock?.('landscape')?.catch?.(() => {});
      } catch { /* ignorar */ }
    } else this.canvas.requestPointerLock?.();
  }

  pause() {
    if (this.state !== 'playing') return;
    this.input.reset();
    this.setState('paused');
  }

  quit() {
    this.setState('menu');
    document.exitPointerLock?.();
  }
}
