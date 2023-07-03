const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('What can I do?'),
  async execute (interaction) {
    // use embed to show all commands
    const embed = new EmbedBuilder()
    interaction.guild.emojis.fetch()
      .then(emojis => console.log(`There are ${[[...emojis.values()]]} emojis.`))
    console.log()
    embed.setDescription('Test <:mana0:1109433672362364938>')
    await interaction.reply({ embeds: [embed], content: 'Yet to be combined!' })
  }
}
