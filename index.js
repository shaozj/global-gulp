#!/usr/bin/env node

var path = require('path');

var projPath = process.cwd();

process.env.PJ_PATH = projPath;

// add --gulpfile parameter
process.argv.push(
  '--gulpfile',
  path.resolve(__dirname, './gulpfile.js')
);

require('gulp/bin/gulp');


