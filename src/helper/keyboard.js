module.exports = function keyboard(keyCode) {
  const key = {};
  key.code = keyCode;
  key.isDown = false;

  window.addEventListener('keydown', (event) => {
    if (event.keyCode === key.code) {
      key.isDown = true;
      event.preventDefault();
    }
  });

  window.addEventListener('keyup', (event) => {
    if (event.keyCode === key.code) {
      key.isDown = false;
      event.preventDefault();
    }
  });

  return key;
};
