import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable(
  // {
  //   providedIn: 'root' // Utiliser la même instance du service à toute l'application
  // }
)
export class PokemonService {

  constructor(private http: HttpClient) { }

  private log(response: any) {
    console.table(response);
  }
  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue); // of transforme une donnée simple en un flux de donnée (Observable) qui emmet la donnée en paramètre (errorValue)
  }

  // Récupérer une liste de pokémon
  // Observable permet les requêtes asynchrones et facilite les appels et traitements
  getPokemonList(): Observable<Pokemon[]> {
    // return POKEMONS;
    return this.http.get<Pokemon[]>("api/pokemons").pipe(
      tap((resPokemonList) => this.log(resPokemonList)), // tap est comme un gros console log mais pour les requêtes
      catchError((error) => this.handleError(error, []))
    );
  }

  // Récupérer un pokémon
  getPokemonById(pokemonId: number): Observable<Pokemon | undefined> {
    // return POKEMONS.find(pokemon => pokemon.id == pokemonId);

    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((resPokemon) => this.log(resPokemon)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  searchPokemonList(term: string): Observable<Pokemon[]> {
    if (term.length <= 1) {
      return of([]) // of retourne la valeur sous forme d'un flux
    }

    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((resPokemonFiltred) => this.log(resPokemonFiltred)),
      catchError((error) => this.handleError(error, []))
    );
  }

  // Modifier un Pokémon  --  Retourne null parce que la simulation d'api est comme ça mais normalement ça renvoie Pokemon | undefined dans l'observable
  updatePokemon(pokemon: Pokemon): Observable<null> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }

    return this.http.put(`api/pokemons`, pokemon, httpOptions).pipe(
      tap((res) => this.log(res)),
      catchError((error) => this.handleError(error, null))
    )
  }

  deletePokemonById(pokemonId: number): Observable<null> {
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((res) => this.log(res)),
      catchError((error) => this.handleError(error, null))
    )
  }

  // Modifier un Pokémon  --  Retourne null parce que la simulation d'api est comme ça mais normalement ça renvoie Pokemon | undefined dans l'observable
  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }

    return this.http.post<Pokemon>(`api/pokemons`, pokemon, httpOptions).pipe(
      tap((res) => this.log(res)),
      catchError((error) => this.handleError(error, null))
    )
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
