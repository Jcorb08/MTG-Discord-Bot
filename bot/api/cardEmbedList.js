const { EmbedBuilder } = require('discord.js')
const { Scryfall } = require('./scryfall')

class CardEmbedList {
  constructor (list, client, query, order) {
    this.query = query
    this.order = order
    this.list = [list]
    this.client = client
    this.page = 0
    this.embeds = []
    this.scryfall = new Scryfall()
    this.embedCreator()
  }

  embedCreator () {
    const embed = this.embedInit()
    let count = 0
    let listDescription = ''
    let endcond = false
    while (!endcond && count < this.list[this.page].total_cards) {
      const card = this.list[this.page].data[count]
      // console.log(`${card.name} ${count}`)
      if (count % 5 === 0 && count !== 0) {
        embed.addFields({ name: ' ', value: structuredClone(listDescription) })
        listDescription = ''
      }
      listDescription += '[' + card.name + ' ' + this.scryfall.getManaEmojis(card.mana_cost) + '](' + card.scryfall_uri + ')\n'
      count++
      if (count === 35 || embed.data.fields?.length === 8) {
        endcond = true
        const url = this.list[this.page].next_page.replace('/cards', '').replace('api.', '').replace('format=json&', '').replace('page=2', 'page=1')
        const strLong = 'Please find the rest of the query [here](' + url + ').'
        embed.addFields({ name: 'List too long', value: strLong })
      }
    }
    // console.log(embed.data)
    this.embeds.push(structuredClone(embed.data))
  }

  embedInit () {
    const embed = new EmbedBuilder()
    embed.setTitle(`Search query for "${this.query}"`)
    embed.setDescription(`List of cards found ordered by: ${this.order}`)
    embed.setAuthor({ name: `Total Cards Found: ${this.list[this.page].total_cards}` })
    embed.setFooter({ text: `Request took ${this.client.ws.ping}ms` })
    return embed
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
