'use strict';
const spacetime = require('spacetime');
const csv = require('csvtojson');
const json2csv = require('json2csv').parse;
const fs = require('fs');

module.exports.default = args => {
  let convertedCsv = [];

  //read incoming file into object
  csv({ delimiter: ';' })
    .fromFile(args.file)
    .subscribe(line => {
      let currentDate = spacetime(line.Date, args['input-timezone']);

      if (!currentDate.isValid()) {
        console.error(`Supplied invalid date. "${line.Date}" can not be parsed.
    Please make sure your date is formatted in this format: "MM/DD/YYYY"`);
        return;
      }
      currentDate = currentDate.time(line.Time);

      const offset = currentDate.timezone().current.offset;

      const shiftedDate = currentDate.subtract(offset, 'hours');
      return (convertedCsv = [
        ...convertedCsv,
        {
          ...line,
          Date: shiftedDate.format('{date-pad}.{month-pad}.{year}'),
          Time: shiftedDate.unixFmt('HH:mm'),
        },
      ]);
    })
    .then(() => {
      const fields = Object.keys(convertedCsv[0]);
      const opts = { fields, flatten: true, quote: '', delimiter: ';' };

      const csv = json2csv(convertedCsv, opts);
      fs.writeFileSync(args.target, csv)
    });
};
