const mongoose = require('mongoose')

module.exports = {
  connectToMongoose: function(mongoURI, errCallback) {
    if(errCallback) {
      mongoose.connect(mongoURI, {
        useNewUrlParser: true
      }, errCallback)
    } else {
      mongoose.connect(mongoURI, {
        useNewUrlParser: true
      }, err => {
        if(err) {
          console.log(err)
        }
      })
    }
    mongoose.set('useCreateIndex', true)
    mongoose.connection.on('connected', () => {
      console.log('MongoDB Connected...');
    }); 
    return mongoose.connection
  },
  closeConnection: function() {
    mongoose.connection.close(err => {
      if(err) {
        console.log(err)
      }
    })
  }
}