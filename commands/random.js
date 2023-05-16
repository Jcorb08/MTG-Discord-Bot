const { SlashCommandBuilder, EmbedBuilder, SlashCommandStringOption } = require('discord.js')
const { Scryfall } = require('../api/scryfallClass.js')

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

    // use embed to show card
    const embed = new EmbedBuilder()
    embed.setColor('Random')
    embed.setTitle(card.name)
    embed.setURL(card.scryfall_uri)
    embed.setDescription(card.type_line)
    embed.setAuthor({ name: interaction.client.user.tag, iconURL: interaction.client.user.avatarURL() })

    await interaction.reply({ embeds: [embed] })
  }
}
