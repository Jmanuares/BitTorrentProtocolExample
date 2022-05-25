'use strict';

const path = require('path').resolve(__dirname, '../Program/');

const fileSystem = require('fs');
const bencode = require('bencode')
const tracker = require(path + '/src/tracker.js')

//const path = require('path').resolve(__dirname, '../Program/puppy.torrent');
const torrent = bencode.decode(fileSystem.readFileSync(path+'/puppy.torrent'));

tracker.getPeers(torrent, peers => {
    console.log('list of peers: ', peers);
});
