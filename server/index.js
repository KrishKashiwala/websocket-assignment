// @ts-nocheck
const express = require('express')
const app = express()
const server = require('http').createServer(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({ server: server });
let cOne = 0, cTwo = 2, cThree = 3
wss.on('connection', function connection(ws) {

	ws.on('message', (message) => {
		let inMessage = JSON.parse(message)
		console.log('received:', inMessage);
		if (inMessage.value) {
			if (inMessage.uni == "cOne") {
				cOne += 1
				ws.send(JSON.stringify({ msg: cOne, uni: "span1" }))
			}
			else if (inMessage.uni == "cTwo") {
				cTwo += 2
				ws.send(JSON.stringify({ msg: cTwo, uni: "span2" }))
			}
			else if (inMessage.uni == "cThree") {
				cThree += 3
				ws.send(JSON.stringify({ msg: cThree, uni: "span3" }))
			}
		}
		else {
			cOne = 0, cTwo = 0, cThree = 0
		}
	});
});


server.listen(3000, () => console.log(`Lisening on port :3000`))