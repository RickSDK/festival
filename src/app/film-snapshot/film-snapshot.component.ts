import { Component, OnInit, Input } from '@angular/core';
import { Film } from '../classes/film';

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
    if (genre == 'Drama')
      return 'fa fa-film';
    if (genre == 'Documentary')
      return 'fa fa-video-camera';
    if (genre == 'Music Video')
      return 'fa fa-music';

    return 'fa fa-film';
  }
}
