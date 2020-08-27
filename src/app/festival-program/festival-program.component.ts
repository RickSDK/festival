import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-festival-program',
  templateUrl: './festival-program.component.html',
  styleUrls: ['./festival-program.component.scss']
})
export class FestivalProgramComponent extends BaseComponent implements OnInit {

  constructor() { super(); }

  ngOnInit(): void {
    this.user = this.getUserObject();
    this.userId = this.user.id;
  }

}
