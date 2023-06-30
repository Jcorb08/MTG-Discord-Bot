const { EmbedBuilder } = require('discord.js')
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
        embed = this.embedInit()
        embed.setImage(this.card.image_uris.png)
        this.card.card_faces.forEach(face => {
          let description = ''
          if (face.oracle_text) {
            description = face.oracle_text
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
          if (face.oracle_text) {
            let description = face.oracle_text
            description = description.replaceAll(/{([A-Za-z0-9]+)}/g, (match, p1, offset) => emojis['mana' + p1.toLowerCase()])
            embed.addFields({ name: ' ', value: description })
          }
          embed.setImage(face.image_uris.png)
          this.embeds.push(structuredClone(embed.data))
        })
      }
    } else {
      // normal - one side one image
      embed = this.embedInit()
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
  getManaEmojis (cost) {
    let manaCost = cost
    if (manaCost) {
      let manaEmojis = ''
      // manaCost - '{2}{B}'
      manaCost = manaCost.replaceAll('{', '').split('}')
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

  embedInit (face = false) {
    const embed = new EmbedBuilder()
    const obj = face || this.card
    console.log(obj)

    // add colour down one side
    if (obj.colors?.length > 0) {
      embed.setColor(Scryfall.colors[obj.colors[0]])
    } else if (obj.color_identity?.length > 0) {
      embed.setColor(Scryfall.colors[obj.color_identity[0]])
    } else {
      embed.setColor('LightGrey')
    }
    // if single cost, add to title otherwise we add to fields
    embed.setTitle(obj.name + this.getManaEmojis(obj.mana_cost))
    embed.setURL(this.card.scryfall_uri)
    embed.setDescription(obj.type_line || this.card.type_line)
    // embed.setAuthor({ name: client.user.tag, iconURL: client.user.avatarURL() })
    embed.setAuthor({ name: this.card.artist })
    if (this.card.released_at) {
      embed.setTimestamp(new Date(this.card.released_at))
    }
    embed.setFooter({ text: `Request took ${this.client.ws.ping}ms` })
    return embed
  }
}

module.exports.CardEmbed = CardEmbed
