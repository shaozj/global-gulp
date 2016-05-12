var path = require('path');

var projPath = process.env.PJ_PATH;

module.exports = function getPath(src) {
  return path.join(projPath, src);
}
