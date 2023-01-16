const { SlashCommandBuilder } = require('discord.js');

module.exports={
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('What can I do?'),
    async execute(interaction){
        // use embed to show all commands
        await interaction.reply('Yet to be combined!');
    },
};