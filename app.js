const path = require('path')
  , app = require('./server')
  , keys = require('./config/keys/keys')

const port = keys.port
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})