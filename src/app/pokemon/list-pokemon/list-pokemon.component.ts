import { Component } from '@angular/core';
import { POKEMONS } from '../../mock/mock-pokemon-list';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrl: './list-pokemon.component.scss'
})
export class ListPokemonComponent {
  pokemons: Pokemon[] = POKEMONS;

  constructor(private route: Router) { }

  goToPokemon(id: number) {
    this.route.navigate(["/pokemons/", id]);
  }
}
