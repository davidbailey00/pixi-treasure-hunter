const play = require('../states/play');
const end = require('../states/end');

module.exports = function startGame(game) {
  const { app } = game;

  let state = 'play';
  app.ticker.add((delta) => {
    if (state === 'play') {
      state = play(game, delta);
    } else if (state === 'end') {
      state = end(game);
    }
  });
};
