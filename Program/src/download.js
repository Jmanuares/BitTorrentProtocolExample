'use strict';

const net = require('net');
const path = require('path').resolve(__dirname, '../src/');
const tracker = require(path + '/tracker.js');
const message = require(path + '/request.js');
const Queue = require(path + '/queue.js');


module.exports = torrent => {
    tracker.getPeers(torrent, peers => {
      
      const pieces = new Pieces(torrent);
      peers.forEach(peer => download(peer, torrent, pieces));
    });
  };

function download(peer) {
    const socket = net.Socket();
    socket.on('error', console.log);
    socket.connect(peer.port, peer.ip, () => {
        socket.write(message.buildHandshake(torrent));
    });

    const queue = new Queue(torrent);
    onWholeMsg(socket, msg => msgHandler(msg, socket, pieces, queue));
}

function onWholeMsg(socket, callback) {
    let savedBuf = Buffer.alloc(0);
    let handshake = true;
  
    socket.on('data', recvBuf => {
        // msgLen calculates the length of a whole message
        const msgLen = () => handshake ? savedBuf.readUInt8(0) + 49 : savedBuf.readInt32BE(0) + 4;
        savedBuf = Buffer.concat([savedBuf, recvBuf]);
    
        while (savedBuf.length >= 4 && savedBuf.length >= msgLen()) {
            callback(savedBuf.slice(0, msgLen()));
            savedBuf = savedBuf.slice(msgLen());
            handshake = false;
        }
    });
}

function msgHandler(msg, socket) {
    if (isHandshake(msg)) {
        socket.write(message.buildInterested());
    } else {
        const m = message.parse(msg);

        if (m.id === 0) chokeHandler();
        if (m.id === 1) unchokeHandler();
        if (m.id === 4) haveHandler(m.payload);
        if (m.id === 5) bitfieldHandler(m.payload);
        if (m.id === 7) pieceHandler(m.payload);
    }
}
  
function isHandshake(msg) {
    return msg.length === msg.readUInt8(0) + 49 &&
    msg.toString('utf8', 1, 20) === 'BitTorrent protocol';
}

function chokeHandler() {
    // ...
}

function unchokeHandler() {
    // ...
}

function haveHandler() {
    // ...
}

function bitfieldHandler() {
    // ...
}

function pieceHandler() {
    // ...
}