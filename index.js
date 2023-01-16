// native file system module
const fs = require('node:fs');
// native path utility module
const path = require('node:path');
// Require necessary Discord Classes
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
// Keep the bot alive!
var http = require('http');
const server = http.createServer();
server.listen(8080);
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
// listener to execute code when app receives interaction
client.on(Events.InteractionCreate, async interaction => {
  // Not all interactions are slash commands
  if (!interaction.isChatInputCommand()) return;
	//console.log(interaction);
  // get matching command 
  const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}
  // call commands execute method
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

//client ready run this!
client.once(Events.ClientReady, c => {
  console.log("I am " + c.user.tag);
});

client.on(Events.Debug, ( e ) => console.log(e));
client.on(Events.Error, ( e ) => console.log(e));
//client.on(Events.Warn, ( e ) => console.log(e));
//client.on(Events.ShardError, ( e ) => console.log(e));

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





