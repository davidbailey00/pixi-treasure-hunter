module.exports = function end(delta, states, vars) {
  const { gameScene, gameOverScene, healthBar, playAgainButton, explorer, treasure } = vars;
  const { play, end } = states;

  gameScene.visible = false;
  gameOverScene.visible = true;

  if (playAgainButton.hasBeenClicked) {
    playAgainButton.hasBeenClicked = false;

    gameScene.visible = true;
    gameOverScene.visible = false;
    treasure.captured = false;

    healthBar.outer.width = 128;

    explorer.x = 68;
    explorer.y = gameScene.height / 2 - explorer.height / 2;
    treasure.x = gameScene.width - treasure.width - 48;
    treasure.y = gameScene.height / 2 - treasure.height / 2;

    return play;
  }

  return end;
};
