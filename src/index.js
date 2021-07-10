const skeldjs = require('@skeldjs/client');

(async () => {
	const client = new skeldjs.SkeldjsClient('‎2021.6.15');

	await client.connect('NA', 'meeee');
	console.info('Connected to server');
})();