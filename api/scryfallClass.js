class Scryfall {
  static scryfallUrl = 'https://api.scryfall.com'
  //   constructor () {
  //     // this.method = method;
  //   }

  async cardsRandom (query) {
    const res = await fetch(this.constructor.scryfallUrl + '/cards/random/?q=' + query)
    if (!res.ok) throw Error(`cardsRandom Response: ${res.status} ${res.statusText}`)
    const json = await res.json()
    if (json.Error) throw Error('cardsRandom JSON ERROR')
    console.log(json)
    return json
  }
}

module.exports.Scryfall = Scryfall
