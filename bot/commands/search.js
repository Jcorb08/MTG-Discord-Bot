const { SlashCommandBuilder, SlashCommandStringOption } = require('discord.js')
const { Scryfall } = require('../api/scryfall.js')
const { CardEmbedList } = require('../api/cardEmbedList.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('search')
    .setDescription('Request a card')
    .addStringOption(new SlashCommandStringOption()
      .setName('query')
      .setDescription('A fulltext search query to filter the pool of random cards.')
      .setRequired(true)
    ),
  async execute (interaction) {
    // request card - returns list object
    const scryfall = new Scryfall()
    const list = await scryfall.cardsSearch(interaction.options.getString('query'))
    // create embed
    const cardEmbeds = new CardEmbedList(list, interaction.client, interaction.options.getString('query'))

    await interaction.reply({ embeds: cardEmbeds.embeds })
  }
}
