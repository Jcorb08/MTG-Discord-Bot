const { EmbedBuilder } = require('discord.js')
const emojis = require('../emojis/emojis.json')

class CardEmbedList {
  constructor (list, client, query) {
    this.query = query
    this.list = [list]
    this.client = client
    this.page = 0
    this.embeds = []
    this.embedCreator()
  }

  embedCreator () {
    let embed = this.embedInit()
    let count = 0
    let listDescription = ''
    this.list[this.page].data.forEach(card => {
      console.log(count)
      console.log(count % 5)
      if (embed.data.fields?.length === 25) {
        this.embeds.push(structuredClone(embed.data))
        embed = this.embedInit()
      }
      if (count % 5 === 0 && count !== 0) {
        embed.addFields({ name: ' ', value: structuredClone(listDescription) })
        listDescription = ''
      }
      listDescription += '[' + card.name + this.getManaEmojis(card.mana_cost) + '](' + card.scryfall_uri + ')\n'
      count++
    })
    console.log(embed.data)
    this.embeds.push(structuredClone(embed.data))
  }

  embedInit () {
    const embed = new EmbedBuilder()
    embed.setTitle(`Search query for "${this.query}"`)
    embed.setDescription('List of cards found')
    embed.setAuthor({ name: `Total Cards Found: ${this.list[this.page].total_cards}` })
    embed.setFooter({ text: `Request took ${this.client.ws.ping}ms` })
    return embed
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

  async getNextPage (nextPage) {
    const res = await fetch(nextPage)
    if (!res.ok) throw Error(`List Next Page Response: ${res.status} ${res.statusText}`)
    const json = await res.json()
    if (json.Error) throw Error('List Next Page JSON ERROR')
    return json
  }
}

module.exports.CardEmbedList = CardEmbedList
