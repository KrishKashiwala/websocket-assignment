// @ts-nocheck
const express = require('express')
const app = express()
const server = require('http').createServer(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({ server: server });
let cOne = 0, cTwo = 0, cThree = 0
setInterval(() => {
	cOne += 1
	cTwo += 2
	cThree += 3
}, 1000)


// max condition
if (cOne >= 10000) {
	cOne = 0
}
if (cTwo >= 10000) {
	cTwo = 0
}
if (cThree >= 10000) {
	cThree = 0
}


wss.on('connection', function connection(ws) {

	ws.on('message', (message) => {
		let inMessage = JSON.parse(message)
		console.log('received:', inMessage);
		if (inMessage.value) {
			if (inMessage.uni == "cOne") {
				ws.send(JSON.stringify({ msg: cOne, uni: "span1" }))
			}
			else if (inMessage.uni == "cTwo") {
				ws.send(JSON.stringify({ msg: cTwo, uni: "span2" }))
			}
			else if (inMessage.uni == "cThree") {
				ws.send(JSON.stringify({ msg: cThree, uni: "span3" }))
			}
		}
		else {
			cOne = 0, cTwo = 0, cThree = 0
		}
	});
});


server.listen(3000, () => console.log(`Lisening on port :3000`))