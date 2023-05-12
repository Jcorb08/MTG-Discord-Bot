// native file system module
const fs = require('node:fs');
// native path utility module
const path = require('node:path');
// Require necessary Discord Classes
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
// Grab .env variables
require('dotenv').config();
// My super secret token
const mySecret = process.env['DISCORD_BOT_SECRET'];
console.log(mySecret);

// Client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
    //GatewayIntentBits.GuildMessages,
  ],
});

// Collection - extends Map Class - stores our commands for execution
client.commands = new Collection();
// construct path to commands dir
const commandsPath = path.join(__dirname, 'commands');
// reads path and returns array of all file names - makes sure its just .js files
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// grabbing event files
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
  // for example ready only happens once
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
    // other events happen multiple times
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Webserver Code
// Keep the bot alive!
var http = require('http');
const server = http.createServer();
server.listen(8080);

// Create server to host bot
server.on('request', (request, res) => {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    var responseJSON = {};
    if (client.isReady()) {
      responseJSON.message = "I am " + client.user.username;
      //JavaScript counts in milliseconds
      var dateTime = new Date(client.readyTimestamp).toLocaleString();
      responseJSON.readyTimestamp = "I was ready at: " + dateTime;
      responseJSON.uptime = "I've been Up for: " + client.uptime + 'ms';
    } else {
      responseJSON.message = 'The Discord bot is not Ready.';
    }
    res.end(JSON.stringify(responseJSON));
  });

// Login to discord with the token
client.login(mySecret);