const { EmbedBuilder } = require('discord.js')
const { Scryfall } = require('./scryfall.js')
const emojis = require('../emojis/emojis.json')

// card_faces null (no key) when none - doesn't always have image for both
// maybe need one for each type of double side?
// split, flip, transform, and double_faced_token

function cardEmbed (card, client) {
  // work out which double sides have one image and which have two
  // split, flip, transform, and double_faced_token
  if (card.card_faces?.length > 0) {
    const embeds = []
    card.card_faces.forEach(element => {
      embeds.push(embedCreator(element, client))
    })
    return embeds
  } else {
    // one face
    return [embedCreator(card, client)]
  }
}

function embedCreator (card, client) {
  // use embed to show card
  const embed = new EmbedBuilder()
  if (card.colors?.length > 0) {
    embed.setColor(Scryfall.colors[card.colors[0]])
  } else if (card.color_identity?.length > 0) {
    embed.setColor(Scryfall.colors[card.color_identity[0]])
  } else {
    embed.setColor('LightGrey')
  }
  let manaEmojis = ''
  if (card.mana_cost) {
    manaEmojis += ' '
    // manaCost - '{2}{B}'
    const manaCost = card.mana_cost.replaceAll('{', '').split('}')
    // remove last
    manaCost.pop()
    manaCost.forEach(element => {
      manaEmojis += emojis['mana' + element.toLowerCase()]
    })
  }
  embed.setTitle(card.name + manaEmojis)
  embed.setURL(card.scryfall_uri)
  embed.setDescription(card.type_line)
  if (card.oracle_text) {
    let description = card.oracle_text
    description = description.replaceAll(/{([A-Za-z0-9]+)}/g, (match, p1, offset) => emojis['mana' + p1.toLowerCase()])
    embed.addFields({ name: ' ', value: description })
  }
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
