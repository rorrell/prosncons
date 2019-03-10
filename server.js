const express = require('express')
  , exphbs = require('express-handlebars')
  , path = require('path')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override')
  , flash = require('connect-flash')
  , passport = require('passport')
  , expressHelper = require('./helpers/express.helper')
  , hbsHelper = require('./helpers/handlebars.helper')
  , mongooseHelper = require('./helpers/mongoose.helper')
  , keys = require('./config/keys/keys')
  , session = require('./config/session')

const app = express()

// Handlebars Middleware
app.set('views', path.join(__dirname, '/views/'))
app.engine('handlebars', exphbs({
  helpers: {
    checkRadio: hbsHelper.checkRadio,
    considerationTotalBadge: hbsHelper.considerationTotalBadge
  },
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Static folder
app.use(express.static(path.join(__dirname, 'public')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')))
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')))
app.use('/css', express.static(path.join(__dirname, '/node_modules/@fortawesome/fontawesome-free/css')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/@fortawesome/fontawesome-free/js')))
app.use('/webfonts', express.static(path.join(__dirname, '/node_modules/@fortawesome/fontawesome-free/webfonts')))

// Method override middleware
app.use(methodOverride('_method'))

//Mongoose
const connection = mongooseHelper.connectToMongoose(keys.mongoURI)

// Express session middleware
app.use(session(connection))

// Connect flash middleware
app.use(flash());

// Passport middleware
require('./config/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  res.locals.user = req.user || null
  next()
})

// Routes
var indexRoutes = require('./routes/index.routes')
var userRoutes = require('./routes/users.routes')
var authRoutes = require('./routes/auth.routes')
var comparisonRoutes = require('./routes/comparisons.routes')
app.use('/', indexRoutes)
app.use('/users', userRoutes)
app.use('/auth', authRoutes)
app.use('/comparisons', comparisonRoutes)
app.get('*', expressHelper.unusedRouteHandler)

// Error handling
app.use(expressHelper.errorHandler)

module.exports = app