const skeldjs = require('@skeldjs/client');
const client = new skeldjs.SkeldjsClient('2021.6.30');
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
const readlineSync = require('readline-sync');
const readline = require('readline');

const promptCL = commands => {
	readlineSync.promptCL(commands, {
		limitMessage: 'Invalid Command',
	});
};

(async () => {
	// Get available servers
	const servers = Object.keys(skeldjs.MatchmakingServers).map(server => server.toString());

	// Get username as input
	const username = readlineSync.question('What username do you want to use: ', {
		limit: /^[^\s]{1,10}$/,
		limitMessage: 'Username can\'t be longer than 10 characters and cannot contain blank characters',
	});
	// Get server as input
	const server = readlineSync.question(`Select a server(${servers.join(', ')}): `, {
		limit: [servers],
		limitMessage: 'Invalid server.',
	});

	await client.connect(server.toUpperCase(), username);

	const commands = {
		list: async (map, impostors) => {
			const games = await client.findGames();
			console.log(`List of available games:\n${games.map(game => `Owner: ${game.name}, Players: ${game.num_players}/${game.max_players}, Map: ${skeldjs.GameMap[game.map]}, Code: ${util.Int2Code(game.code)}, Impostors: ${game.num_impostors}`).join('\n')}`);
			promptCL(commands);
		},
		join: async (code) => {
			const game = await client.joinGame(util.Code2Int(code));
			console.log(`Joined game: ${game.name}`);
		},
	};

	// Show available commands
	console.info(`Connected to server. List of commands: ${Object.keys(commands).map(command => command.toString()).join(', ')}`);

	promptCL(commands);
})();