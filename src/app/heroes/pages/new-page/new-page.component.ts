import {Component} from '@angular/core';
import {Hero, Publisher} from "../../interfaces/hero.interface";
import {FormControl, FormGroup} from "@angular/forms";
import {HeroesService} from "../../services/heroes.service";

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: []
})
export class NewPageComponent {


  constructor(private heroesService: HeroesService) {
  }

  heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', {nonNullable: true}),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  get currentHero(): Hero {
    return this.heroForm.value as Hero;
  }

  public publishers = [
    {id: 'DC Comics', desc: Publisher.DCComics},
    {id: 'Marvel Comics', desc: Publisher.MarvelComics},
  ];

  onSubmit(): void {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero)
        .subscribe(value => {
          // TODO: mostrar snackbar
        });
    } else {
      this.heroesService.addHero(this.currentHero)
        .subscribe(value => {
          // TODO: mostrar snackbar
        });
    }
  }

}
