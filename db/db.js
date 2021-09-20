const mongoose = require('mongoose')
const dbURI  = 'mongodb://localhost:27017/upload'

mongoose.connect(dbURI, {
    useNewUrlParser: true
})

mongoose.connection.on('connected', function() {
    console.log('Mongoose default connection connected to' + dbURI)
})

mongoose.connection.on('error', function() {
    console.log('Mongoose default connection connection error:' + err)
})

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose default connection disconnected')
})

mongoose.connection.on('open', function() {
    console.log('Mongoose default connection is open')
})

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected through app termination')
        process.exit(0)
    })
})