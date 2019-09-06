const convert = require('./convert').default;
var fs = require('fs');

test('conversion works', async () => {
  convert({
    file: './__fixtures__/example_us.csv',
    'input-timezone': 'Eastern Time',
    target: './__fixtures__/target_us.csv',
  });

  await new Promise(resolve => {
    setTimeout(resolve, 500);
  });

  const contents = fs.readFileSync('./__fixtures__/target_us.csv', 'utf8');

  expect(contents).toEqual(`Queue;Date;Time;CallsOffered;CallsHandled;AHT
TLS Inbound;25.04.2016;11:00;15;14;230
TLS Inbound;25.04.2016;11:30;10;8;270
TLS Inbound;25.04.2016;12:00;18;17;189
TLS Inbound;25.04.2016;12:30;11;11;212
TLS Inbound;25.04.2016;12:45;11;13;212
TLS Inbound;25.04.2016;13:00;14;11;212
TLS Inbound;25.04.2016;13:15;15;10;212
TLS Inbound;25.04.2016;13:30;16;13;212
TLS Inbound;25.04.2016;13:45;17;12;212
TLS Inbound;25.04.2016;14:00;18;15;212
TLS Inbound;25.04.2016;14:15;12;9;212
TLS Inbound;25.04.2016;14:30;32;23;212
TLS Inbound;25.04.2016;14:45;34;24;212
TLS Inbound;25.04.2016;03:00;53;45;212
TLS Inbound;25.04.2016;03:15;64;34;212
TLS Inbound;25.04.2016;03:30;13;11;212
TLS Inbound;25.04.2016;03:45;23;13;212
TLS Inbound;25.04.2016;16:00;23;11;212
TLS Inbound;25.04.2016;16:15;12;11;212`);
});

test("doesn't try to convert to september 31st", async () => {
  convert({
    file: './__fixtures__/example_us_september.csv',
    'input-timezone': 'Eastern Time',
    target: './__fixtures__/target_us_september.csv',
  });

  await new Promise(resolve => {
    setTimeout(resolve, 500);
  });

  const contents = fs.readFileSync(
    './__fixtures__/target_us_september.csv',
    'utf8',
  );

  expect(contents).toEqual(`Queue;Date;Time;Offered;Handled;AHT;Channel
Inbound;01.09.2018;03:00;0;0;0;calls`);
});
