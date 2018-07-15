module.exports = function play(delta, states, vars) {
  const { play, end } = states;
  const {
    keys, contain, hitTestRectangle, explorer,
    blobs, healthBar, treasure, message, door
  } = vars;

  [explorer.vx, explorer.vy] = [0, 0];
  if (keys.left.isDown) {
    explorer.vx -= 5;
  }
  if (keys.up.isDown) {
    explorer.vy -= 5;
  }
  if (keys.right.isDown) {
    explorer.vx += 5;
  }
  if (keys.down.isDown) {
    explorer.vy += 5;
  }
  if (Math.abs(explorer.vx) + Math.abs(explorer.vy) === 10) {
    explorer.vx /= Math.sqrt(2);
    explorer.vy /= Math.sqrt(2);
  }

  explorer.x += explorer.vx * delta;
  explorer.y += explorer.vy * delta;

  contain(explorer, { x: 28, y: 10, width: 488, height: 480 });
  let explorerHit = false;

  for (const blob of blobs) {
    blob.y += blob.vy * delta;

    let blobHitsWall = contain(blob, { x: 28, y: 10, width: 488, height: 480 });
    if (blobHitsWall === 'top' || blobHitsWall === 'bottom') {
      blob.vy *= -1;
    }

    if (hitTestRectangle(explorer, blob)) {
      explorerHit = true;
    }
  }

  if (explorerHit) {
    explorer.alpha = 0.5;
    healthBar.outer.width -= 3 * delta;
  } else {
    explorer.alpha = 1;
  }

  if (hitTestRectangle(explorer, treasure)) {
    treasure.captured = true;
  }

  if (treasure.captured) {
    treasure.x = explorer.x + 8;
    treasure.y = explorer.y + 8;
  }

  if (healthBar.outer.width <= 0) {
    message.text = 'You lost!';
    return end;
  }

  if (hitTestRectangle(treasure, door)) {
    message.text = 'You won!';
    return end;
  }

  return play;
};
