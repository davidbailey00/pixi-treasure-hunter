const PIXI = require('pixi.js');

module.exports = function createGameScene(game) {
  const { app, tex } = game;

  const gameScene = new PIXI.Container(512);
  app.stage.addChild(gameScene);

  const gameParticles = new PIXI.particles.ParticleContainer(512, { tint: true });
  gameScene.addChild(gameParticles);

  const dungeon = new PIXI.Sprite(tex['dungeon.png']);
  gameParticles.addChild(dungeon);

  const door = new PIXI.Sprite(tex['door.png']);
  [door.x, door.y] = [32, 0];
  gameParticles.addChild(door);

  Object.assign(game, { gameScene, gameParticles, dungeon, door });
};
