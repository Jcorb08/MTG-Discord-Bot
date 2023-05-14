class Scryfall {
    static scryfallUrl = 'https://api.scryfall.com';
    constructor(method){
        this.method = method;
    }

    async fetch(){
        const response = await fetch(this.constructor.scryfallUrl + this.method);
        const json = await response.json();
        console.log(json);
    }
}

sc = new Scryfall('/cards/random');
console.log(sc);
sc.fetch();

