var npm = require('npm')
  , os = require('os')
  , fs = require('fs')
  , path = require('path')
  , ejs = require('ejs')

module.exports = function(name, cb) {
  var dir = path.join(os.tmpdir(), name)
  fs.mkdir(dir, function(err) {
    if (err && err.code !== 'EEXIST') return cb(err)
    var from = path.resolve(path.join(__dirname, 'squat.json'))
      , to = path.join(dir, 'package.json')
    ejs.renderFile(from, { name: name }, function(err, json) {
      if (err) return cb(err)
      fs.writeFile(to, json, function(err) {
        if (err) return cb(err)
        npm.load({}, function(err) {
          if (err) return cb(err)
          npm.commands.publish([dir], cb)
        })
      })
    })
  })
}
