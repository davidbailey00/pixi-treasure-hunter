module.exports = function createGameScene(vars) {
  const { app, Container, ParticleContainer, Sprite, id } = vars;

  const gameScene = new Container(512);
  app.stage.addChild(gameScene);

  const gameParticles = new ParticleContainer(512, { tint: true });
  gameScene.addChild(gameParticles);

  const dungeon = new Sprite(id['dungeon.png']);
  gameParticles.addChild(dungeon);

  const door = new Sprite(id['door.png']);
  [door.x, door.y] = [32, 0];
  gameParticles.addChild(door);

  return { gameScene, gameParticles, dungeon, door };
};
