import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrl: './list-pokemon.component.scss'
})
export class ListPokemonComponent implements OnInit {
  pokemons: Pokemon[];

  constructor(
    private pokemonService: PokemonService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonList()
      .subscribe(pokemonList => this.pokemons = pokemonList); // On récupère la pokemonList de l'api grace à l'observable avec subscribe et on l'attribut à pokemons
  }

  goToAddForm() {
    this.route.navigate(["/add/pokemon"])
  }

  goToPokemon(id: number) {
    this.route.navigate(["/pokemon/", id]);
  }
}
