const { SlashCommandBuilder,EmbedBuilder } = require('discord.js');
const { Scryfall } = require('../api/scryfallClass.js');

module.exports={
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('What can I do?'),
    async execute(interaction){
        // use embed to show all commands
        const embed = new EmbedBuilder();
        const scryfall = new Scryfall();
        card = scryfall.cardsRandom()
        embed.setDescription('Name: ' . card.name)
        await interaction.reply({embeds:[embed],content:'Yet to be combined!'});
    },
};