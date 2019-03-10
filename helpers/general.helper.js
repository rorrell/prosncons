const path = require('path')

module.exports = {
  makePathAbsolute: (filePath) => {
    if(filePath.substr(0, 2) == './') {
      filePath = filePath.substr(2)
    }
    return path.join(__dirname, filePath)
  }
}