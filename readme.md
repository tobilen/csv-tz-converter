## CSV Transformer

### Quickstart:
* Install node (version 10 or higher)
* Install required packages with yarn (if installed) or npm install
* Then run the script on your input csv file 
  `node ./index -f ./myInput.csv -i "Eastern Time" -t ./myOutput.csv`

### Arguments
#### -f (or --file)
Specifiy the path to the input file

#### -i (or --input-timezone)
Specify the Timezone the provided file was created in. Accepts IANA compatible timezone names. See https://gist.github.com/aviflax/a4093965be1cd008f172 for a full list

#### -t (or --target)
Specify the path of the output file

### Current Limitations

- Only MM/DD/YYYY date format
- Only semicolon as separator
