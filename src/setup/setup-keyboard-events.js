const keyboard = require('../helper/keyboard');

module.exports = function setupKeyboardEvents(game) {
  const keys = {
    left: keyboard(37),
    up: keyboard(38),
    right: keyboard(39),
    down: keyboard(40)
  };

  Object.assign(game, { keys });
};
