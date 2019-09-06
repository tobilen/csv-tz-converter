'use strict';
const spacetime = require('spacetime');
const { parse, format } = require('date-fns');
const csv = require('csvtojson');
const json2csv = require('json2csv').parse;
const fs = require('fs');

module.exports.default = args => {
  let convertedCsv = [];

  //read incoming file into object
  csv({ delimiter: ';' })
    .fromFile(args.file)
    .subscribe(line => {
      let currentDate = spacetime(
        format(
          parse(
            line.Date,
            args['input-date-format'] || 'MM/dd/yyyy',
            new Date(),
          ),
          'yyyy-MM-dd HH:mm:ss',
        ),
        args['input-timezone'],
      );

      if (!currentDate.isValid()) {
        console.error(`Supplied invalid date. "${line.Date}" can not be parsed.
    Please either fix your format to match "MM/DD/YYYY" or pass a custom format`);
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
      fs.writeFileSync(args.target, csv);
    });
};
