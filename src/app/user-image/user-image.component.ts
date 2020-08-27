import { Component, OnInit, Input } from '@angular/core';
import { User } from '../classes/user';

@Component({
  selector: 'app-user-image',
  templateUrl: './user-image.component.html',
  styleUrls: ['./user-image.component.scss']
})
export class UserImageComponent implements OnInit {
  @Input('user') user: User;
  @Input('size') size: number;
  @Input('imageCard') imageCard: boolean;

  constructor() { }

  ngOnInit(): void {
  }
  ngClassImage() {
    if (this.imageCard)
      return 'imageCard';
  }
}
