var express = require('express')
var routerUsers = require('./routers/users')
var routerHotels = require('./routers/hotels')
var routerRooms = require('./routers/rooms')
var routerBookings = require('./routers/bookings')
var routerAuthentication = require('./routers/authentication')
var mongoose = require('mongoose')

mongoose.Promise = Promise
mongoose.connect('mongodb://localhost:27017/nodejsapi', {useNewUrlParser: true, useUnifiedTopology: true})

var db = mongoose.connection
db.on('error', console.error.bind(console, "connection error: "))
db.once('open', () => console.log('status :', db.states[db._readyState]))

var app = express()

app.use(express.json())

app.use('/hotels', routerHotels)
app.use('/users', routerUsers)
app.use('/rooms', routerRooms)
app.use('/bookings', routerBookings)
app.use('/login', routerAuthentication)

app.get('/status', (req,res) => res.json({dbstatus: db.states[db._readyState]}))

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on', PORT)
})

