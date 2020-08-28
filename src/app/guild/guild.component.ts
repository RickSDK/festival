import { Component, OnInit } from '@angular/core';
import { BaseHttpComponent } from '../base-http/base-http.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.scss']
})
export class GuildComponent extends BaseHttpComponent implements OnInit {

  constructor() { super(); }

  ngOnInit(): void {
    this.user = this.getUserObject();
    this.userId = this.user.id;
  }

}
