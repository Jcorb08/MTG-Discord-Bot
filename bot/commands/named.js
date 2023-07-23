const { SlashCommandBuilder, SlashCommandStringOption } = require('discord.js')
const { Scryfall } = require('../api/scryfall.js')
const { CardEmbed } = require('../api/cardEmbed.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('name')
    .setDescription('Request a single card by name.')
    .addStringOption(new SlashCommandStringOption()
      .setName('query')
      .setDescription('A fuzzy card name to search for does not have to be exact.')
      .setRequired(true)
    ),
  async execute (interaction) {
    // request card - returns list object
    const scryfall = new Scryfall()
    const card = await scryfall.cardsNamed(interaction.options.getString('query'))
    // create embed

    const cardEmbeds = new CardEmbed(card, interaction.client)

    await interaction.reply({ embeds: [cardEmbeds.embeds[0]] })
    for (let index = 1; index < cardEmbeds.embeds.length; index++) {
      await interaction.followUp({ embeds: [cardEmbeds.embeds[index]] })
    }
  }
}
