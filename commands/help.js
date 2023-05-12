const { SlashCommandBuilder,EmbedBuilder } = require('discord.js');

module.exports={
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('What can I do?'),
    async execute(interaction){
        // use embed to show all commands
        const embed = new EmbedBuilder().setDescription('Pong!');
        await interaction.reply({embeds:[embed],content:'Yet to be combined!'});
    },
};