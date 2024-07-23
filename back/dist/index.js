"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
console.log('listening');
wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    console.log('connected');
    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });
    ws.send('something');
});
