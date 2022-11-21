//process.exit();
// Require necessary Discord Classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
// Keep the bot alive!
var http = require('http');
const server = http.createServer();
server.listen(8080);
// My super secret token
const mySecret = process.env['DISCORD_BOT_SECRET'];
console.log(mySecret);

// Client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
    //GatewayIntentBits.GuildMessages,
  ],
});

//client ready run this!
client.once(Events.ClientReady, c => {
  console.log("I am " + c.user.tag);
});

client.on(Events.Debug, ( e ) => console.log(e));
client.on(Events.Error, ( e ) => console.log(e));
//client.on(Events.Warn, ( e ) => console.log(e));
//client.on(Events.ShardError, ( e ) => console.log(e));

server.on('request', (request, res) => {
  res.setHeader("Content-Type", "application/json");
  res.writeHead(200);
  var responseJSON = {};
  if (client.isReady()) {
    responseJSON.message = "I am " + client.user.username;
    //JavaScript counts in milliseconds
    var dateTime = new Date(client.readyTimestamp).toLocaleString();
    responseJSON.readyTimestamp = "I was ready at: " + dateTime;
    responseJSON.uptime = "I've been Up for: " + client.uptime + 'ms';
  } else {
    responseJSON.message = 'The Discord bot is not Ready.';
  }
  res.end(JSON.stringify(responseJSON));
});

// Login to discord with the token
client.login(mySecret);





