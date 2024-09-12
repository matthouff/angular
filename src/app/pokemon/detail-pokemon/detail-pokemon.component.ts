import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { POKEMONS } from '../../mock/mock-pokemon-list';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrl: './detail-pokemon.component.scss'
})
export class DetailPokemonComponent implements OnInit {
  pokemonList: Pokemon[] = POKEMONS;
  pokemon: Pokemon | undefined;

  constructor(private router: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    // Récupérer les paramètres de l'url (:id) défini dans les routes "app.routes.ts"
    const pokemonId: string | null = this.router.snapshot.paramMap.get('id');
    this.pokemon = pokemonId ? this.pokemonList.find(pokemon => pokemon.id === +pokemonId) : undefined;
    console.log(this.pokemon?.name);
  }

  goToPokemonList() {
    this.route.navigate(["/pokemons"])
  }
}
