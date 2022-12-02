// Since commands only need to be registered once, and updated when the
// definition (description, options etc) is changed, it's not necessary to 
// connect a whole client to the gateway or do this on every ready event. As 
// such, a standalone script using the lighter REST manager is preferred.

//You only need to run node deploy-commands.js once. You should only run it again if you add or edit existing commands.

const { REST, SlashCommandBuilder, Routes } = require('discord.js');
const mySecret = process.env['DISCORD_BOT_SECRET'];
const appID = process.env['DISCORD_BOT_APP_ID'];
const guildID = process.env['DISCORD_BOT_DEV_GUILD_ID'];

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(mySecret);

rest.put(Routes.applicationGuildCommands(appID, guildID), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);