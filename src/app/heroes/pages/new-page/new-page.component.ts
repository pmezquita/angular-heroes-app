import {Component} from '@angular/core';
import {Publisher} from "../../interfaces/hero.interface";

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: []
})
export class NewPageComponent {
  public publishers = [
    {id: 'DC Comics', desc: Publisher.DCComics},
    {id: 'Marvel Comics', desc: Publisher.MarvelComics},
  ];
}
