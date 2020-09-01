import { Component, OnInit, Input } from '@angular/core';
import { Film } from '../classes/film';

declare var ngClassGenre: any;

@Component({
  selector: 'app-film-snapshot',
  templateUrl: './film-snapshot.component.html',
  styleUrls: ['./film-snapshot.component.scss']
})
export class FilmSnapshotComponent implements OnInit {
  @Input('film') film: Film;

  constructor() { }

  ngOnInit(): void {
  }
  filmMatchesType(film: any) {
    return true;
  }
  ngClassGenre(genre: string) {
    return ngClassGenre(genre);
  }
}
