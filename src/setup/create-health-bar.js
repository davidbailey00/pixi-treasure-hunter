const PIXI = require('pixi.js');

module.exports = function createHealthBar(game) {
  const { app, gameScene } = game;

  const healthBar = new PIXI.Container();
  [healthBar.x, healthBar.y] = [app.stage.width - 170, 4];
  gameScene.addChild(healthBar);

  const innerBar = new PIXI.Graphics();
  innerBar.beginFill(0x000000);
  innerBar.drawRect(0, 0, 128, 8);
  innerBar.endFill();
  healthBar.addChild(innerBar);

  const outerBar = new PIXI.Graphics();
  outerBar.beginFill(0xFF3300);
  outerBar.drawRect(0, 0, 128, 8);
  outerBar.endFill();
  healthBar.addChild(outerBar);
  healthBar.outer = outerBar;

  Object.assign(game, { healthBar });
};
