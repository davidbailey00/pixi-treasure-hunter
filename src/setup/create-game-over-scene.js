const PIXI = require('pixi.js');
const Container = PIXI.Container;
const TextStyle = PIXI.TextStyle;
const Text = PIXI.Text;

module.exports = function createGameOverScene(game) {
  const { app } = game;

  const gameOverScene = new Container();
  app.stage.addChild(gameOverScene);

  gameOverScene.visible = false;

  const style = new TextStyle({
    fontFamily: 'Rockwell',
    fontSize: 64,
    fill: 'white'
  });

  const message = new Text('The End!', style);
  message.anchor.x = 0.5;
  message.x = app.stage.width / 2;
  message.y = app.stage.height / 2 - 64;
  gameOverScene.addChild(message);

  const playAgainStyle = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 'grey'
  });

  const playAgainButton = new Text('Click here to play again', playAgainStyle);
  playAgainButton.anchor.x = 0.5;
  playAgainButton.x = app.stage.width / 2;
  playAgainButton.y = app.stage.height / 2 + 32;
  gameOverScene.addChild(playAgainButton);

  playAgainButton.interactive = true;
  playAgainButton.hasBeenClicked = false;

  playAgainButton.on('pointerup', () => playAgainButton.hasBeenClicked = true);

  Object.assign(game, { gameOverScene, message, playAgainButton });
};
