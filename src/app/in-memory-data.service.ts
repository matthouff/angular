import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from "angular-in-memory-web-api";
import { POKEMONS } from './mock/mock-pokemon-list';

// Ce Service permet simplement de simuler une API REST en lui passant un tableau de valeurs au sein d'un objet

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    // On ne peut pas appeler POKEMONS directement dans l'objet
    const pokemons = POKEMONS;
    return { pokemons };
  }
}
