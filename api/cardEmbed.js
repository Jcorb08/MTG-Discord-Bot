const { EmbedBuilder, Faces } = require('discord.js')
const { Scryfall } = require('./scryfall.js')
const emojis = require('../emojis/emojis.json')

// card_faces null (no key) when none - doesn't always have image for both
// maybe need one for each type of double side?
// split, flip, transform, and double_faced_token

class CardEmbed {
  constructor (card, client) {
    this.card = card
    this.client = client
    this.embeds = []
    this.embedCreator()
  }

  embedCreator () {
    // work out which double sides have one image and which have two
    // split, flip, transform, and double_faced_token, modal_dfc, art_series
    let embed
    if (this.card.card_faces?.length > 0) {
      if (this.card.layout === 'split' || this.card.layout === 'flip') {
        // one image two face
        embed = this.embedInit(this.card)
        embed.setImage(this.card.image_uris.png)
        this.card.card_faces.forEach(face => {
          let description = ''
          if (this.card.oracle_text) {
            description = this.card.oracle_text
            description = description.replaceAll(/{([A-Za-z0-9]+)}/g, (match, p1, offset) => emojis['mana' + p1.toLowerCase()])
          }
          const title = face.name + this.getManaEmojis(face.mana_cost)
          embed.addFields({ name: title, value: description, inline: true })
        })
        this.embeds = [embed]
      } else {
        // two images two faces
        this.card.card_faces.forEach(face => {
          embed = this.embedInit(face)
        })
      }
    } else {
      // normal - one side one image
      embed = this.embedInit(this.card)
      if (this.card.oracle_text) {
        let description = this.card.oracle_text
        description = description.replaceAll(/{([A-Za-z0-9]+)}/g, (match, p1, offset) => emojis['mana' + p1.toLowerCase()])
        embed.addFields({ name: ' ', value: description })
      }
      embed.setImage(this.card.image_uris.png)
      this.embeds = [embed]
    }
  }

  // add mana emojis to title / field
  getManaEmojis (manaCost) {
    if (manaCost) {
      let manaEmojis = ''
      // manaCost - '{2}{B}'
      const manaCost = this.card.mana_cost.replaceAll('{', '').split('}')
      // remove last
      manaCost.pop()
      manaCost.forEach(element => {
        manaEmojis += emojis['mana' + element.toLowerCase()]
      })
      return manaEmojis
    } else {
      return ''
    }
  }

  embedInit (card) {
    const embed = new EmbedBuilder()
    // add colour down one side
    if (card.colors?.length > 0) {
      embed.setColor(Scryfall.colors[card.colors[0]])
    } else if (card.color_identity?.length > 0) {
      embed.setColor(Scryfall.colors[this.card.color_identity[0]])
    } else {
      embed.setColor('LightGrey')
    }
    // if single cost, add to title otherwise we add to fields
    embed.setTitle(card.name + this.getManaEmojis(this.card.mana_cost))
    embed.setURL(card.scryfall_uri)
    embed.setDescription(card.type_line)
    // embed.setAuthor({ name: client.user.tag, iconURL: client.user.avatarURL() })
    embed.setAuthor({ name: card.artist })
    if (card.released_at) {
      embed.setTimestamp(new Date(card.released_at))
    }
    embed.setFooter({ text: `Request took ${this.client.ws.ping}ms` })
    return embed
  }
}

module.exports.CardEmbed = CardEmbed
