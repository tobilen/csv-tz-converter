const convert = require('./convert').default;
var fs = require('fs');

test('conversion works', () => {
  convert({
    file: './__fixtures__/example_us.csv',
    inputTimezone: 'Eastern Time',
    target: './__fixtures__/target_us.csv',
  });

  const contents = fs.readFileSync('./__fixtures__/target_us.csv', 'utf8');

  expect(contents).toEqual(`Queue;Date;Time;CallsOffered;CallsHandled;AHT
TLS Inbound;25.04.2016;06:00;15;14;230
TLS Inbound;25.04.2016;06:30;10;8;270
TLS Inbound;25.04.2016;07:00;18;17;189
TLS Inbound;25.04.2016;07:30;11;11;212
TLS Inbound;25.04.2016;07:45;11;13;212
TLS Inbound;25.04.2016;08:00;14;11;212
TLS Inbound;25.04.2016;08:15;15;10;212
TLS Inbound;25.04.2016;08:30;16;13;212
TLS Inbound;25.04.2016;08:45;17;12;212
TLS Inbound;25.04.2016;09:00;18;15;212
TLS Inbound;25.04.2016;09:15;12;9;212
TLS Inbound;25.04.2016;09:30;32;23;212
TLS Inbound;25.04.2016;09:45;34;24;212
TLS Inbound;24.04.2016;22:00;53;45;212
TLS Inbound;24.04.2016;22:15;64;34;212
TLS Inbound;24.04.2016;22:30;13;11;212
TLS Inbound;24.04.2016;22:45;23;13;212
TLS Inbound;25.04.2016;11:00;23;11;212
TLS Inbound;25.04.2016;11:15;12;11;212`);
});
