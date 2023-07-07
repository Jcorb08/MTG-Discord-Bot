const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('What can I do?'),
  async execute (interaction) {
    // use embed to show all commands
    const embed = new EmbedBuilder()
    // interaction.guild.emojis.fetch()
    //   .then(emojis => console.log(`There are ${[[...emojis.values()]]} emojis.`))
    embed.setTitle('For a list of commands visit the website')
    embed.setURL('https://jcorb.tech/MTG-Discord-Bot/')
    embed.setDescription(`
      If you need additonal help join the [community Discord server](https://discord.gg/6H82MnWSTW)! \n 
      Commands that have query strings support the fulltext search system found on [scryfall.com](https://scryfall.com/docs/syntax). \n
      This bot has been up since ${interaction.client.readyAt}. \n
      The bot has a latency of ${Math.abs(Date.now() - interaction.createdTimestamp)}ms.`
    )
    await interaction.reply({ embeds: [embed] })
  }
}
