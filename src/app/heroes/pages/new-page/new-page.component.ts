import {Component, OnInit} from '@angular/core';
import {Hero, Publisher} from "../../interfaces/hero.interface";
import {FormControl, FormGroup} from "@angular/forms";
import {HeroesService} from "../../services/heroes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: []
})
export class NewPageComponent implements OnInit {

  heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', {nonNullable: true}),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.heroesService.getHeroById(id)),
      ).subscribe(hero => {
      if (!hero) return this.router.navigateByUrl('/');

      this.heroForm.reset(hero);
      return;
    });
  }

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
