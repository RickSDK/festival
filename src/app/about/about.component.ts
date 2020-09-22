import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent extends BaseComponent implements OnInit {

  constructor() { super(); }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.user = this.getUserObject();
    this.userId = this.user.id;
  }

}
