const PIXI = require('pixi.js');

const randomInt = require('random-int');
const keyboard = require('./helper/keyboard');
const contain = require('./helper/contain');
const hitTestRectangle = require('./helper/hit-test-rectangle');

const createGameScene = require('./setup/create-game-scene');
const createEntities = require('./setup/create-entities');
const createBlobs = require('./setup/create-blobs');
const createHealthBar = require('./setup/create-health-bar');
const createGameOverScene = require('./setup/create-game-over-scene');
const setupKeyboardEvents = require('./setup/setup-keyboard-events');

const play = require('./states/play');
const end = require('./states/end');

const Application = PIXI.Application,
  Container = PIXI.Container,
  ParticleContainer = PIXI.particles.ParticleContainer,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Graphics = PIXI.Graphics,
  Sprite = PIXI.Sprite,
  Text = PIXI.Text,
  TextStyle = PIXI.TextStyle;

const app = new Application({
  width: 512,
  height: 512,
  antialias: true,
  transparent: false,
  resolution: 2,
  autoResize: true
});

document.body.appendChild(app.view);

loader
  .add('images/treasure-hunter.json')
  .load(setup);

function setup() {
  const keys = setupKeyboardEvents(keyboard);
  const id = resources['images/treasure-hunter.json'].textures;

  const vars = {
    app, Container, ParticleContainer, Sprite, Graphics, TextStyle, Text,
    randomInt, keys, contain, hitTestRectangle, id
  };

  createGameScene(vars);
  createEntities(vars);
  createBlobs(vars);

  createHealthBar(vars);
  createGameOverScene(vars);

  const states = { play, end };
  let state = play;

  app.ticker.add(delta => {
    state = state(delta, states, vars);
  });
}
