import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit-film',
  templateUrl: './submit-film.component.html',
  styleUrls: ['./submit-film.component.scss']
})
export class SubmitFilmComponent extends BaseComponent implements OnInit {
  public currentMonth = new Date().getMonth() + 1;

  constructor(private router: Router) { super(); }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.user = this.getUserObject();
    this.userId = this.user.id;
  }
  okButtonPressed(msg:string) {
    this.router.navigate(['join']);
  }
}
