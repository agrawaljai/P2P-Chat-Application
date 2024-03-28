const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

let peer1;
let peer2;

wss.on('connection', function connection(ws) {
    if (!peer1) {
        peer1 = ws;
    } else if (!peer2) {
        peer2 = ws;
    }
    
    console.log('A peer joined.');

    ws.on('message', function incoming(message) {
        // Forward the message to the other peer
        const recipient = ws === peer1 ? peer2 : peer1;
        if (recipient && recipient.readyState === WebSocket.OPEN) {
            console.log(message);
            recipient.send(message);
        }
        
    });
});

server.listen(3000, function listening() {
    console.log('Signaling server is listening on port 3000');
});