const path = require('path')
  , app = require('./server')
  , keys = require('./config/keys/keys')
  , mongooseHelper = require('./helpers/mongoose.helper')

// Mongoose connect
mongooseHelper.connectToMongoose(keys.mongoURI)

const port = keys.port
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})