import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss']
})
export class LoadingBarComponent implements OnInit {
  @Input('errorMessage') errorMessage: string;

  constructor() { }

  ngOnInit(): void {
  }

}
