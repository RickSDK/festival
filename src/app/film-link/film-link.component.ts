import { Component, OnInit, Input } from '@angular/core';
import { Film } from '../classes/film';

@Component({
  selector: 'app-film-link',
  templateUrl: './film-link.component.html',
  styleUrls: ['./film-link.component.scss']
})
export class FilmLinkComponent implements OnInit {
  @Input('filmObj') filmObj: any;
  @Input('userId') userId: number = 0;
  public user: any;
  public isAdmin = false;

  constructor() { }

  ngOnInit(): void {
    this.isAdmin = (this.userId == 1 || this.userId == 124);
  }

}
