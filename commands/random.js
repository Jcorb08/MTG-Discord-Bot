const { SlashCommandBuilder, SlashCommandStringOption } = require('discord.js')
const { Scryfall } = require('../api/scryfall.js')
const { cardEmbed } = require('../api/cardEmbed.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('random')
    .setDescription('Request a card at random')
    .addStringOption(new SlashCommandStringOption()
      .setName('query')
      .setDescription('An optional fulltext search query to filter the pool of random cards.')
    ),
  async execute (interaction) {
    // request card
    const scryfall = new Scryfall()
    const card = await scryfall.cardsRandom(interaction.options.getString('query'))
    // create embed
    const cardEmbeds = cardEmbed(card, interaction.client)

    await interaction.reply({ embeds: cardEmbeds })
  }
}
