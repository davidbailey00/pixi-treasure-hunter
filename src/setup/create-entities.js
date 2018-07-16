const PIXI = require('pixi.js');
const Sprite = PIXI.Sprite;

module.exports = function createEntities(game) {
  const { id, gameParticles } = game;

  const explorer = new Sprite(id['explorer.png']);
  explorer.x = 68;
  explorer.y = gameParticles.height / 2 - explorer.height / 2;
  [explorer.vx, explorer.vy] = [0, 0];
  gameParticles.addChild(explorer);

  const treasure = new Sprite(id['treasure.png']);
  treasure.x = gameParticles.width - treasure.width - 48;
  treasure.y = gameParticles.height / 2 - treasure.height / 2;
  gameParticles.addChild(treasure);

  Object.assign(game, { explorer, treasure });
};
