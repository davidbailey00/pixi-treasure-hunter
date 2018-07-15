module.exports = function setupKeyboardEvents(keyboard) {
  const left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40);

  return { left, up, right, down };
};
