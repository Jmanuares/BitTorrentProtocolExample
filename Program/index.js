'use strict';

const cpath = require('path').resolve(__dirname, '../Program/');

const torrentParser = require(cpath + '/src/torrentParser.js');
const download = require(cpath + '/src/download.js');



const torrent = torrentParser.open(process.argv[2]);
console.log("Se inicializo la descarga")

download(torrent, torrent.info.name);