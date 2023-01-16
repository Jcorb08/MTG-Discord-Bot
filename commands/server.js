const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the Server.'),
	async execute(interaction) {
		// If you need to access your client instance from inside a command file, you can access it via interaction.client
		await interaction.reply(`This bot is ${interaction.client.user.username}, who has been up for ${interaction.client.uptime}.`);
	},
};
