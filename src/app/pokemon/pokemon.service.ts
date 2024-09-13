import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { POKEMONS } from '../mock/mock-pokemon-list';

@Injectable(
  // {
  //   providedIn: 'root' // Utiliser la même instance du service à toute l'application
  // }
)
export class PokemonService {

  getPokemonList(): Pokemon[] {
    return POKEMONS;
  }

  getPokemonById(pokemonId: number): Pokemon | undefined {
    return POKEMONS.find(pokemon => pokemon.id == pokemonId);
  }

  getPokemonTypeList(): string[] {
    return [
      "Plante",
      "Feu",
      "Eau",
      "Insecte",
      "Normal",
      "Electrik",
      "Poison",
      "Fée",
      "Vol",
      "Combat",
      "Psy"
    ]
  }
}
