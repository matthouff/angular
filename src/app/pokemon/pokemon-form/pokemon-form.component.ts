import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrl: './pokemon-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonFormComponent implements OnInit {

  @Input() pokemon: Pokemon;

  types: string[];


  constructor(
    private pokemonService: PokemonService,
    private route: Router,
  ) { }

  ngOnInit() {
    this.types = this.pokemonService.getPokemonTypeList();
  }

  hasType(type: string): boolean {
    return this.pokemon.types.includes(type);
  }

  selectType(type: string): void {
    if (this.pokemon.types.length < 3) {
      this.pokemon.types.push(type)
    }
  }

  removeType(type: string) {
    const index = this.pokemon.types.indexOf(type);
    this.pokemon.types.splice(index, 1)
  }

  onSubmit() {
    console.log('Submit form');
    this.route.navigate(["/pokemon", this.pokemon.id]);
  }

  isTypeValid(type: string): boolean {
    if (this.pokemon.types.length === 1 && this.hasType(type)) {
      return false;
    }
    if (this.pokemon.types.length >= 3 && !this.hasType(type)) {
      return false
    }
    return true;

  }

}
