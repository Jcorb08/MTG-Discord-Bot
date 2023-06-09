const { SlashCommandBuilder, SlashCommandStringOption } = require('discord.js')
const { Scryfall } = require('../api/scryfall.js')
const { CardEmbed } = require('../api/cardEmbed.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('name')
    .setDescription('Request a card by name')
    .addStringOption(new SlashCommandStringOption()
      .setName('query')
      .setDescription('A fuzzy card name to search for does not have to be exact.')
      .setRequired(true)
    ),
  async execute (interaction) {
    // request card - returns list object
    const scryfall = new Scryfall()
    const list = await scryfall.cardsSearch(interaction.options.getString('query'))
    // create embed

    const cardEmbeds = new CardEmbed(list.data[0], interaction.client)

    // use arrows to go through all embeds?

    await interaction.reply({ embeds: cardEmbeds.embeds })
  }
}
