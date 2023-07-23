const emojis = require('../emojis/emojis.json')

class Scryfall {
  static scryfallUrl = 'https://api.scryfall.com'
  static colors = {
    W: 'White',
    U: 'Blue',
    B: 'Black',
    R: 'Red',
    G: 'Green'
  }

  async cardsRandom (query) {
    const res = await fetch(this.constructor.scryfallUrl + '/cards/random' + (query ? '?q=' + query : ''))
    if (!res.ok) return Error(`cardsRandom Response: ${res.status} ${res.statusText}`)
    const json = await res.json()
    if (json.Error) return Error('cardsRandom JSON ERROR')
    // console.log(json)
    return json
  }

  async cardsSearch (query, order) {
    const res = await fetch(this.constructor.scryfallUrl + '/cards/search' + '?order=' + order + '&q=' + query)
    if (!res.ok) return Error(`cardsSearch Response: ${res.status} ${res.statusText}`)
    const json = await res.json()
    if (json.Error) return Error('cardsSearch JSON ERROR')
    // console.log(`${json.total_cards} ${json.has_more} ${json.data.length}`)
    return json
  }

  async cardsNamed (query) {
    const res = await fetch(this.constructor.scryfallUrl + '/cards/named' + '?fuzzy=' + query)
    if (!res.ok) return Error(`cardsNamed Response: ${res.status} ${res.statusText}`)
    const json = await res.json()
    if (json.Error) return Error('cardsNamed JSON ERROR')
    // console.log(json)
    return json
  }

  async cardsAutocomplete (query) {
    const res = await fetch(this.constructor.scryfallUrl + '/cards/autocomplete' + '?q=' + query)
    if (!res.ok) return Error(`cardsRandom Response: ${res.status} ${res.statusText}`)
    const json = await res.json()
    if (json.Error) return Error('cardsRandom JSON ERROR')
    // console.log(json)
    return json
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
        if (element.includes(' // ')) {
          element = element.replaceAll(' // ', '')
          manaEmojis += ' // '
        }
        if (element.includes('/')) {
          element = element.replaceAll('/', '')
        }
        manaEmojis += emojis['mana' + element.toLowerCase()]
      })
      return manaEmojis
    } else {
      return ''
    }
  }
}

module.exports.Scryfall = Scryfall
