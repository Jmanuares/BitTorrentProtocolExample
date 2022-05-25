'use strict';

const path = require('path').resolve(__dirname, '../Program/');

const tracker = require(path + '/src/tracker.js');
const torrentParser = require(path + '/src/torrentParser.js');


const torrent = torrentParser.open(path+'/puppy.torrent');

tracker.getPeers(torrent, peers => {
    console.log('list of peers: ', peers);
});
