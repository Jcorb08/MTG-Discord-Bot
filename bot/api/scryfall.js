class Scryfall {
  static scryfallUrl = 'https://api.scryfall.com'
  static colors = {
    W: 'White',
    U: 'Blue',
    B: 'Black',
    R: 'Red',
    G: 'Green'
  }
  //   constructor () {
  //     // this.method = method;
  //   }

  async cardsRandom (query) {
    const res = await fetch(this.constructor.scryfallUrl + '/cards/random/' + (query ? '?q=' + query : ''))
    if (!res.ok) throw Error(`cardsRandom Response: ${res.status} ${res.statusText}`)
    const json = await res.json()
    if (json.Error) throw Error('cardsRandom JSON ERROR')
    console.log(json)
    return json
  }

  async cardsSearch (query) {
    const res = await fetch(this.constructor.scryfallUrl + '/cards/search/' + '?q=' + query)
    if (!res.ok) throw Error(`cardsRandom Response: ${res.status} ${res.statusText}`)
    const json = await res.json()
    if (json.Error) throw Error('cardsRandom JSON ERROR')
    console.log(json)
    return json
  }

  async cardsNamed (query) {
    const res = await fetch(this.constructor.scryfallUrl + '/cards/named/' + '?fuzzy=' + query)
    if (!res.ok) throw Error(`cardsRandom Response: ${res.status} ${res.statusText}`)
    const json = await res.json()
    if (json.Error) throw Error('cardsRandom JSON ERROR')
    console.log(json)
    return json
  }
}

module.exports.Scryfall = Scryfall
