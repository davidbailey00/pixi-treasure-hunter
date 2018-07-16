const PIXI = require('pixi.js');
const Sprite = PIXI.Sprite;

const randomInt = require('random-int');

module.exports = function createBlobs(game) {
  const { tex, gameParticles } = game;

  const blobs = [];
  const numberOfBlobs = 6,
    spacing = 48,
    xOffset = 150,
    speed = 2;
  let direction = 1;

  for (let i = 0; i < numberOfBlobs; i += 1) {
    const blob = new Sprite(tex['blob.png']);
    blob.x = spacing * i + xOffset;
    blob.y = randomInt(gameParticles.height - blob.height);

    blob.vy = speed * direction;
    direction *= -1;

    blobs.push(blob);
    gameParticles.addChild(blob);
  }

  Object.assign(game, { blobs });
};
