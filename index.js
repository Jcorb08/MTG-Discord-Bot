// Require necessary Discord Classes
const { Client, GatewayIntentBits}  = require('discord.js');
// Keep the bot alive!
var http = require('http');
const server = http.createServer();
server.listen(8080);
// My super secret token
const mySecret = process.env['Discord_Bot_Secret'];

// Client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
    //GatewayIntentBits.GuildMessages,
  ],
});

//client ready run this!
client.once('ready', () => {
  console.log("I am " + client.user.username);
});

// Login to discord with the token
client.login(mySecret);
console.log('boo')

server.on('request', (request, res) => {
  res.setHeader("Content-Type", "application/json");
  res.writeHead(200);
  var responseJSON = {};
  if(client.isReady()){
    responseJSON.message = "I am " + client.user.username;
    //JavaScript counts in milliseconds
    var dateTime = new Date(client.readyTimestamp).toLocaleString();
    responseJSON.readyTimestamp = "I was ready at: " + dateTime;
    responseJSON.uptime = "I've been Up for: " + client.uptime + 'ms';
  } else {
    responseJSON.message = 'The Discord bot is not Ready.';
  }
  res.end(JSON.stringify(responseJSON));
})
  





