import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { debounceTime, distinctUntilChanged, filter, Observable, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styleUrl: './search-pokemon.component.scss'
})
export class SearchPokemonComponent implements OnInit {

  // Subject appartient à RxJS stoque les recherches successives que l'utilisateur tape
  // Il représente un flux dans le temps {..."a".."ab"...."abz"..."ab".."abc"...............}
  searchTerms = new Subject<string>()
  // {...pokemonList(a)..pokemonList(ab)....pokemonList(abz)...pokemonList(ab)..pokemonList(abc)................}
  // Le $ permet de signaler que l'élément est un observable et donc qu'il possède un flux de données (pas obligatoire)
  pokemons$: Observable<Pokemon[]>

  constructor(private route: Router, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      // {..."a"."ab"..."abz"."ab"...."abc"...............} les "." représentent le temps

      // Permet d'attendre 300ms avant d'envoyer la requête filtrant ainsi le nombre de requêtes
      debounceTime(300),
      // {...."ab"...."ab"...."abc"...............} Rendu final après avoir exclu les recherches avec un temps inférieur à 300ms 

      distinctUntilChanged(),
      // { ...."ab"........"abc"...............} Supprime les doublons de requêtes afin d'alléger les appels api

      // map((term) => this.pokemonService.searchPokemonList(term))
      // { ....Observable<"ab">........Observable<"abc">...............} (Ce n'est pas le résultat que l'on souhaite puisque l'on attend un tableau de pokémon filtré)

      switchMap((term) => this.pokemonService.searchPokemonList(term))
      // { ....pokemonList(ab)........pokemonList(abc)...............}
    )
  }

  search(term: string) {
    this.searchTerms.next(term)
    console.log(term);
  }


  goToDetails(pokemon: Pokemon) {
    this.route.navigate(["/pokemon", pokemon.id]);
  }
}
