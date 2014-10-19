var optimist = require('optimist')
  .usage('Usage: $0 [options]')
  .options('p', {
    alias: 'port',
    describe: 'server port',
    default: 8000
  })
  .options('h', {
    alias: 'help',
    describe: 'show this help',
    default: false
  })

var argv = optimist.argv
if (argv.help) {
  optimist.showHelp()
  process.exit(0)
}


var express = require('express')
var app = express()
app.use(express.static(__dirname + '/build'))
app.use('/bower_components',  express.static(__dirname + '/bower_components'))

var server = require('http').createServer(app)
server.listen(argv.port, function() {
  console.log('Server listening at port %d', argv.port)
})
