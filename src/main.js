const PIXI = require('pixi.js');

const setupKeyboardEvents = require('./setup/setup-keyboard-events');
const createGameScene = require('./setup/create-game-scene');
const createEntities = require('./setup/create-entities');
const createBlobs = require('./setup/create-blobs');
const createHealthBar = require('./setup/create-health-bar');
const createGameOverScene = require('./setup/create-game-over-scene');
const startGame = require('./setup/start-game');


PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const app = new PIXI.Application({
  width: 512,
  height: 512,
  antialias: true,
  transparent: false,
  resolution: 2,
  autoResize: true
});

document.body.appendChild(app.view);

PIXI.loader
  .add('images/treasure-hunter.json')
  .load(setup);

function setup() {
  const tex = PIXI.loader.resources['images/treasure-hunter.json'].textures;
  const game = { app, tex };

  setupKeyboardEvents(game);

  createGameScene(game);
  createEntities(game);
  createBlobs(game);

  createHealthBar(game);
  createGameOverScene(game);

  startGame(game);
}
