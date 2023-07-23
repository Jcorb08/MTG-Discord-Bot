const { SlashCommandBuilder, SlashCommandStringOption } = require('discord.js')
const { Scryfall } = require('../api/scryfall.js')
const { CardEmbedList } = require('../api/cardEmbedList.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('search')
    .setDescription('Request a list of cards by query')
    .addStringOption(new SlashCommandStringOption()
      .setName('query')
      .setDescription('A fulltext search query to filter the pool of cards.')
      .setRequired(true)
    )
    .addStringOption(new SlashCommandStringOption()
      .setName('order')
      .setDescription('The order of the list that is returns')
      .setRequired(true)
      .addChoices(
        { name: 'Name', value: 'name' },
        { name: 'Set', value: 'set' },
        { name: 'Released', value: 'released' },
        { name: 'Rarity', value: 'rarity' },
        { name: 'Mana Value', value: 'cmc' },
        { name: 'Color', value: 'color' },
        { name: 'Edhrec', value: 'edhrec' }
      )
    ),
  async execute (interaction) {
    // request card - returns list object
    const scryfall = new Scryfall()
    const list = await scryfall.cardsSearch(interaction.options.getString('query'), interaction.options.getString('order'))
    // create embed
    const cardEmbeds = new CardEmbedList(list, interaction.client, interaction.options.getString('query'), interaction.options.getString('order'))

    await interaction.reply({ embeds: cardEmbeds.embeds })
  }
}
