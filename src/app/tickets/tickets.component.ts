import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent extends BaseComponent implements OnInit {

  constructor() { super(); }

  ngOnInit(): void {
    this.user = this.getUserObject();
    this.userId = this.user.id;
  }

}
