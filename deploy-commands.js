// Since commands only need to be registered once, and updated when the
// definition (description, options etc) is changed, it's not necessary to
// connect a whole client to the gateway or do this on every ready event. As
// such, a standalone script using the lighter REST manager is preferred.

// You only need to run node deploy-commands.js once. You should only run it again if you add or edit existing commands.

const { REST, Routes } = require('discord.js')
// Grab .env variables
require('dotenv').config()
// native file system module
const fs = require('node:fs')
const mySecret = process.env.DISCORD_BOT_SECRET
const appID = process.env.DISCORD_BOT_APP_ID
const guildID = process.env.DISCORD_BOT_DEV_GUILD_ID

const commands = []
// Grab all the command files from the commands directory must end with .js
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  commands.push(command.data.toJSON())
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(mySecret);

// and deploy your commands!
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`)

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      // deploy to specific guild to test
      //Routes.applicationGuildCommands(appID, guildID),
      // deploy global
      Routes.applicationCommands(appID),
      { body: commands }
    )

    console.log(`Successfully reloaded ${data.length} application (/) commands.`)
  } catch (error) {
    // And of course, make sure to catch and log any errors!
    console.error(error)
  }
})()
