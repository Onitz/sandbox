const bitcoin = require('bitcoinjs-lib');
const fs = require('fs');

const logging = false;
const testing = false;
const dummyPrivate = 'L5AvBWoPP5khkr41CyTL3VUa1c5gLZeLvx5gZLTuCQocBKa2thxi';
const dummyPublic = '19rJ5PSjfEn6XXfP3Jqj8Ggend5bbygcYu';
const start = new Date().getTime();
const spacer = Array(43).join('-');
const throwErr = err => { if (err) throw err; }
let keyPair, x;

// Setup test address & ensure file writes work
if(testing) { dorm.push(dummyPublic); }
fs.writeFileSync('testWrite.txt', "Test", throwErr);
fs.unlink('testWrite.txt', throwErr);

console.log(`Bitcoin Lotto- dormant key checking begin!\n${spacer}`);
for(i=1;;i++) {
  keyPair = bitcoin.ECPair.makeRandom();
  x = keyPair.getAddress();
  if(testing && i%100==0) { keyPair = bitcoin.ECPair.fromWIF(dummyPrivate); }

  if(logging) console.log(x.padEnd(34),i.toString().padStart(7));

  if(dorm.indexOf(x)!==-1) {
    console.log(spacer);
    console.log('WINNER WIF: '+keyPair.toWIF());
    fs.writeFileSync(`WIN-${Date.now()}.txt`, 'WINNER WIF: '+keyPair.toWIF());
    break;
  }
}
const runtime = ((new Date().getTime())-start)/1000;
console.log(`Completed in ${runtime} seconds.${testing?'':' Congratulations.'}`);