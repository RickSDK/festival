import { Component, OnInit, Input } from '@angular/core';
import { Film } from '../classes/film';

@Component({
  selector: 'app-film-link',
  templateUrl: './film-link.component.html',
  styleUrls: ['./film-link.component.scss']
})
export class FilmLinkComponent implements OnInit {
  @Input('filmId') filmId: number = 0;
  @Input('name') name: String = '';
  @Input('director') director: String = '';
  @Input('tagline') tagline: String = '';
  @Input('userFlg') userFlg: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
