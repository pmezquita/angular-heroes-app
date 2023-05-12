import {Component} from '@angular/core';
import {Publisher} from "../../interfaces/hero.interface";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: []
})
export class NewPageComponent {

  heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', {nonNullable: true}),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publishers = [
    {id: 'DC Comics', desc: Publisher.DCComics},
    {id: 'Marvel Comics', desc: Publisher.MarvelComics},
  ];

}
