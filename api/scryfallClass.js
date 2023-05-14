class Scryfall {
    static scryfallUrl = 'https://api.scryfall.com';
    constructor(){
        //this.method = method;
    }

    async fetch(method){
        const response = await fetch(this.constructor.scryfallUrl + method);
        const json = await response.json();
        console.log(json);
        return json
    }

    async cardsRandom(){
        returnFetch = await this.fetch('/cards/random');
        return returnFetch;
    }
}

module.exports.Scryfall = Scryfall;