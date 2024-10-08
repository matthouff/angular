import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-add-pokemon',
  templateUrl: './add-pokemon.component.html',
  styleUrl: '../pokemon-form/pokemon-form.component.scss'
})
export class AddPokemonComponent implements OnInit {
  pokemon: Pokemon;

  ngOnInit(): void {
    this.pokemon = new Pokemon();
  }
}
