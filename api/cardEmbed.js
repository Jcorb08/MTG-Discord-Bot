const { EmbedBuilder } = require('discord.js')
const { Scryfall } = require('./scryfall.js')
const emojis = require('../emojis/emojis.json')

function cardEmbed (card, client) {
  // use embed to show card
  const embed = new EmbedBuilder()
  embed.setColor(Scryfall.colors[card.colors[0]] ?? 'LightGrey')
  let mana_emojis = '';
  if (card.mana_cost){
    mana_emojis += ' '
    // mana_cost - '{2}{B}'
    let mana_cost = card.mana_cost.replaceAll('{','').split('}')
    // remove last
    mana_cost.pop()
    mana_cost.forEach(element => {
      mana_emojis += emojis['mana'+element.toLowerCase()]
    });
  }
  embed.setTitle(card.name + mana_emojis)
  embed.setURL(card.scryfall_uri)
  embed.setDescription(card.type_line)
  // embed.setAuthor({ name: client.user.tag, iconURL: client.user.avatarURL() })
  embed.setAuthor({ name: card.artist })
  if (card.released_at) {
    embed.setTimestamp(new Date(card.released_at))
  }
  embed.setImage(card.image_uris.png)
  embed.setFooter({ text: `Request took ${client.ws.ping}ms` })
  return embed
}

module.exports.cardEmbed = cardEmbed
