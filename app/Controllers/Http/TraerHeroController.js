'use strict'

class TraerHeroController {
    async getSuperHeroes({ request, response }) {
        try {
            let heroe = request.get().heroe;
            let buscarHeroes = (heroeB) => {
                let req = require('request');
                let options = {
                    'method': 'GET',
                    'url': 'https://superheroapi.com/api/4746056058798549/search/' + heroeB,
                    'headers': {
                        'Cookie': '__cfduid=d33de878414974b9e968fe4935e1417291604279135'
                    }
                };
                let solicitud = new Promise((resolve, reject) => {
                    req(options, function(error, response) {
                        if (error) reject(error)
                        let result = JSON.parse(response.body);
                        return resolve(result.results);
                    });
                });
                return solicitud
            }
            let superHeroesObtenidos = await buscarHeroes(heroe);
            if (superHeroesObtenidos != undefined) {
                let newListHeroes = [];
                superHeroesObtenidos.forEach(element => {
                    newListHeroes.push({
                        Heroe: element.name,
                        Nombre: element.biography['full-name'],
                        Bando: element.biography.publisher,
                        intelligence: element.powerstats.intelligence,
                        strength: element.powerstats.strength,
                        speed: element.powerstats.speed,
                        durability: element.powerstats.durability,
                        power: element.powerstats.power,
                        combat: element.powerstats.combat,
                    });
                });
                return response.status(200).json(newListHeroes);
            } else {
                return response.status(200).json({ message: 'no se encontro héroe' });
            }
        } catch (error) {
            console.log(error);
            return response.status(200).json({ message: error });
        }
    }
}

module.exports = TraerHeroController