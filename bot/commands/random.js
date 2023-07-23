const { SlashCommandBuilder, EmbedBuilder, SlashCommandStringOption } = require('discord.js')
const { Scryfall } = require('../api/scryfall.js')
const { CardEmbed } = require('../api/cardEmbed.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('random')
    .setDescription('Request a single card at random.')
    .addStringOption(new SlashCommandStringOption()
      .setName('query')
      .setDescription('An optional fulltext search query to filter the pool of random cards.')
    ),
  async execute (interaction) {
    // request card
    const scryfall = new Scryfall()
    const card = await scryfall.cardsRandom(interaction.options.getString('query'))
    if (card instanceof Error) {
      const cardEmbed = new EmbedBuilder()
      cardEmbed.setTitle('No random card found for "' + interaction.options.getString('query') + '"')
      await interaction.reply({ embeds: [cardEmbed] })
    } else {
      // create embed
      const cardEmbeds = new CardEmbed(card, interaction.client)
      await interaction.reply({ embeds: [cardEmbeds.embeds[0]] })
      for (let index = 1; index < cardEmbeds.embeds.length; index++) {
        await interaction.followUp({ embeds: [cardEmbeds.embeds[index]] })
      }
    }
  }
}
