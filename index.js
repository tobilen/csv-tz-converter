#!/usr/bin/env node
'use strict';
const minimist = require('minimist');
const convert = require('./convert').default;

const args = minimist(process.argv.slice(2), {
  alias: {
    f: 'file',
    t: 'target',
    i: 'input-timezone',
  },
});

if (!args.file) {
  console.error('No Input file specified.');
}

convert(args);
