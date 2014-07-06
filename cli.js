#!/usr/bin/env node

var squat = require('./index')

if (process.argv.length > 2)
  for (var i = 2; i < process.argv.length; i++)
    squat(process.argv[i], function(err) {
      if (err) throw err
    })
else
  console.log("Usage: squat module_name [module_name...]")
