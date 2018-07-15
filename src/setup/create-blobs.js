module.exports = function createBlobs(vars) {
  const { Sprite, id, randomInt, gameParticles } = vars;

  const blobs = [];
  const numberOfBlobs = 6,
    spacing = 48,
    xOffset = 150,
    speed = 2;
  let direction = 1;

  for (let i = 0; i < numberOfBlobs; i += 1) {
    const blob = new Sprite(id['blob.png']);
    blob.x = spacing * i + xOffset;
    blob.y = randomInt(gameParticles.height - blob.height);

    blob.vy = speed * direction;
    direction *= -1;

    blobs.push(blob);
    gameParticles.addChild(blob);
  }

  return { blobs };
};
