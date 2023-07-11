const { SlashCommandBuilder, EmbedBuilder, SlashCommandStringOption } = require('discord.js')
const { Scryfall } = require('../api/scryfall.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('autocomplete')
    .setDescription('Returns names of cards that could be related to given input')
    .addStringOption(new SlashCommandStringOption()
      .setName('query')
      .setDescription('A card name to autocomplete.')
      .setRequired(true)
    ),
  async execute (interaction) {
    // use embed to show all commands
    const embed = new EmbedBuilder()
    const scryfall = new Scryfall()
    const list = await scryfall.cardsAutocomplete(interaction.options.getString('query'))
    // console.log(list.data.length)
    if (list.data) {
      embed.setTitle('Similar card names to "' + interaction.options.getString('query') + '"')
      embed.setDescription(list.data.toString().replaceAll(',', '\n '))
    } else {
      embed.setTitle('No similar card names found')
    }
    await interaction.reply({ embeds: [embed] })
  }
}
