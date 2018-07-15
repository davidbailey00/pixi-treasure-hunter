module.exports = function createGameOverScene(vars) {
  const { app, Container, TextStyle, Text } = vars;

  const gameOverScene = new Container();
  app.stage.addChild(gameOverScene);

  gameOverScene.visible = false;

  const style = new TextStyle({
    fontFamily: 'Rockwell',
    fontSize: 64,
    fill: 'white'
  });

  const message = new Text('The End!', style);
  message.x = 120;
  message.y = app.stage.height / 2 - 32;
  gameOverScene.addChild(message);

  const playAgainStyle = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 'grey'
  });

  const playAgainButton = new Text('Click here to play again', playAgainStyle);
  playAgainButton.x = 120;
  playAgainButton.y = app.stage.height / 2 + 64;
  gameOverScene.addChild(playAgainButton);

  playAgainButton.interactive = true;
  playAgainButton.hasBeenClicked = false;

  playAgainButton.on('pointerup', () => playAgainButton.hasBeenClicked = true);

  Object.assign(vars, { gameOverScene, message, playAgainButton });
};
