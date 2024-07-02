const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath); // fs-extra enables deleting all files using a single command

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8'); // contains abi and bytecode
const output = solc.compile(source, 1).contracts; // contains output of both contracts within our contract

fs.ensureDirSync(buildPath); // checks if directory exists, creates one if directory does not exists

for (let contract in output) {
    fs.outputJsonSync( // writes content of output in a json file
        path.resolve(buildPath, contract.replace(':','') + '.json'), // creating a
        output[contract] // contents of output
    );
}