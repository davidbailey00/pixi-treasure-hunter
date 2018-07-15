module.exports = function hitTestRectangle(r1, r2) {
  if (r1.x < r2.x + r2.width &&
    r2.x < r1.x + r1.width &&
    r1.y < r2.y + r2.width &&
    r2.y < r1.y + r1.width) {
    return true;
  } else {
    return false;
  }
};
