## CSV Transformer

### Quickstart:
* Install node (version 10 or higher)
* Run `npm install -g csv-tz-converter`
* Then run the script on your input csv file 
  `convert-timezone -f myInput.csv -i "Eastern Time" -t myOutput.csv`

### Arguments
#### -f (or --file)
Specifiy the path to the input file

#### -d (or --input-date-format)
Specify the format of the dates in the incoming file. Defaults to `MM/dd/yyyy`. Allowed values can be found here: https://date-fns.org/v2.0.1/docs/parse

#### -i (or --input-timezone)
Specify the Timezone the provided file was created in. Accepts IANA compatible timezone names. See https://gist.github.com/aviflax/a4093965be1cd008f172 for a full list

#### -t (or --target)
Specify the path of the output file

### Current Limitations

- Only MM/DD/YYYY date format
- Only semicolon as separator
