import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrl: './detail-pokemon.component.scss'
})
export class DetailPokemonComponent implements OnInit {
  pokemonList: Pokemon[] | undefined;
  pokemon: Pokemon | undefined;

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    // Récupérer les paramètres de l'url (:id) défini dans les routes "app.routes.ts"
    const pokemonId: string | null = this.router.snapshot.paramMap.get('id');
    if (pokemonId) {
      this.pokemonService.getPokemonById(+pokemonId).subscribe(pokemon => this.pokemon = pokemon)
    }
  }

  goToEdit() {
    this.route.navigate(["/edit/pokemon", this.pokemon?.id])
  }

  goToPokemonList() {
    this.route.navigate(["/pokemons"])
  }

  onDeletePokemon(pokemon: Pokemon) {
    this.pokemonService.deletePokemonById(pokemon.id)
      .subscribe(() => {
        this.goToPokemonList()
      })
  }
}
