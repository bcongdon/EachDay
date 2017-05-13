var csv = require('csvtojson')
var fs = require('fs')

var events = []
csv()
.fromFile('./events.csv')
.on('json', d => events.push(d))
.on('done', () => {
  fs.writeFileSync('./events.json', JSON.stringify(events))
})
