const PIXI = require('pixi.js');
const Container = PIXI.Container;
const ParticleContainer = PIXI.particles.ParticleContainer;
const Sprite = PIXI.Sprite;

module.exports = function createGameScene(game) {
  const { app, tex } = game;

  const gameScene = new Container(512);
  app.stage.addChild(gameScene);

  const gameParticles = new ParticleContainer(512, { tint: true });
  gameScene.addChild(gameParticles);

  const dungeon = new Sprite(tex['dungeon.png']);
  gameParticles.addChild(dungeon);

  const door = new Sprite(tex['door.png']);
  [door.x, door.y] = [32, 0];
  gameParticles.addChild(door);

  Object.assign(game, { gameScene, gameParticles, dungeon, door });
};
