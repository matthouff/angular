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
  pokemons: Pokemon[] | undefined;

  constructor(
    private pokemonService: PokemonService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.pokemons = this.pokemonService.getPokemonList();
  }

  goToPokemon(id: number) {
    this.route.navigate(["/pokemon/", id]);
  }
}
