const { SlashCommandBuilder } = require('discord.js');

module.exports={
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('I reply with Pong!'),
    async execute(interaction){
        await interaction.reply(`Pong! Reacted in ${interaction.client.ws.ping}ms`);
    },
};