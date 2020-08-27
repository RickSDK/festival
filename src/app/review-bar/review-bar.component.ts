import { Component, OnInit, Input } from '@angular/core';
import { Film } from '../classes/film';

@Component({
  selector: 'app-review-bar',
  templateUrl: './review-bar.component.html',
  styleUrls: ['./review-bar.component.scss']
})
export class ReviewBarComponent implements OnInit {
  @Input('film') film: Film;
  @Input('wideFlg') wideFlg: boolean;
  
  constructor() { }

  ngOnInit(): void {
  }

}
