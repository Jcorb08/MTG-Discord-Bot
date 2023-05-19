const { SlashCommandBuilder, SlashCommandStringOption } = require('discord.js')
const { Scryfall } = require('../api/scryfall.js')
const { cardEmbed } = require('../api/cardEmbed.js')

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

    const embed = cardEmbed(list.data[0], interaction.client)

    // use arrows to go through all embeds?

    await interaction.reply({ embeds: [embed] })
  }
}
