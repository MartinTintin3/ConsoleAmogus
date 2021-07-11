const skeldjs = require('@skeldjs/client');
const util = require('@skeldjs/util');
/* const log4js = require('log4js');
log4js.configure({
	categories: {
		default: {
			appenders: ['Console Amogus'],
		},
	},
});
const logger = log4js.getLogger('default');
logger.level = 'debug'; */
const readline = require('readline-sync');

(async () => {
	const client = new skeldjs.SkeldjsClient('2021.6.30');
	// Get available servers
	const servers = Object.keys(skeldjs.MatchmakingServers).map(server => server.toString());

	// Get username as input
	const username = readline.question('What username do you want to use: ', {
		limit: /^.{0,10}$/,
		limitMessage: 'Username can\'t be longer than10 characters.',
	});
	// Get server as input
	const server = readline.question(`Select a server(${servers.join(', ')}): `, {
		limit: [servers],
		limitMessage: 'Invalid server.',
	});

	await client.connect(server.toUpperCase(), username);

	const commands = {
		list: async () => {
			// Get all the games
			const games = await client.findGames();
			console.log(`List of available games:\n${games.map(game => `Players: ${game.num_players}/${game.max_players}, Map: ${game.map.}`)}`);
		},
	};

	// Show available commands
	console.info(`Connected to server. List of commands: ${Object.keys(commands).map(command => command.toString()).join(', ')}`);

	readline.promptCLLoop(commands);
})();