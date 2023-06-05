const { REST, Routes } = require('discord.js')
// Grab .env variables
require('dotenv').config()
// native file system module
const mySecret = process.env.DISCORD_BOT_SECRET
const appID = process.env.DISCORD_BOT_APP_ID
const guildID = process.env.DISCORD_BOT_DEV_GUILD_ID

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(mySecret)

// grab cmdline args
const args = process.argv.slice(2)
// if argument
if (args[0] === 'global') {
  // deploy global
  console.log('Deleted Global Cmds')
  // for global commands
  rest.put(Routes.applicationCommands(appID), { body: [] })
    .then(() => console.log('Successfully deleted all application commands.'))
    .catch(console.error)
} else if (args[0] === 'guild') {
  console.log('Deleted Guild Cmds')
  // for guild-based commands
  rest.put(Routes.applicationGuildCommands(appID, guildID), { body: [] })
    .then(() => console.log('Successfully deleted all guild commands.'))
    .catch(console.error)
} else {
  // deploy to specific guild to test
  console.log('guild/global not specified, nothing Deleted')
}
