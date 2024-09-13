import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable(
  // {
  //   providedIn: 'root' // Utiliser la même instance du service à toute l'application
  // }
)
export class PokemonService {

  constructor(private http: HttpClient) { }

  private log(response: Pokemon[] | Pokemon | undefined) {
    console.table(response);
  }
  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue); // of transforme une donnée simple en un flux de donnée (Observable) qui emmet la donnée en paramètre (errorValue)
  }

  // Observable permet les requêtes asynchrones et facilite les appels et traitements
  getPokemonList(): Observable<Pokemon[]> {
    // return POKEMONS;
    return this.http.get<Pokemon[]>("api/pokemons").pipe(
      tap((resPokemonList) => this.log(resPokemonList)), // tap est comme un gros console log mais pour les requêtes
      catchError((error) => this.handleError(error, []))
    );
  }

  getPokemonById(pokemonId: number): Observable<Pokemon | undefined> {
    // return POKEMONS.find(pokemon => pokemon.id == pokemonId);

    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((resPokemon) => this.log(resPokemon)),
      catchError((error) => this.handleError(error, undefined))
    );
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
