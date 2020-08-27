import { Component, OnInit, Input } from '@angular/core';
import { User } from '../classes/user';

@Component({
  selector: 'app-user-snapshot',
  templateUrl: './user-snapshot.component.html',
  styleUrls: ['./user-snapshot.component.scss']
})
export class UserSnapshotComponent implements OnInit {
  @Input('user') user: User;

  constructor() { }

  ngOnInit(): void {
  }

}
