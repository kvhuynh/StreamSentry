const tmi = require('tmi.js');

const client = new tmi.Client({
	channels: [ 'forsen' ]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
	// "Alca: Hello, World!"
	// console.log(`${tags['display-name']}: ${message}`);
	if (tags["subscriber"] == true) {
		console.log(`${tags['display-name']}: ${message}`);

	}
});

