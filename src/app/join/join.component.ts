import { Component, OnInit } from '@angular/core';
import { BaseHttpComponent } from '../base-http/base-http.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent extends BaseHttpComponent implements OnInit {

  constructor(private router: Router) { super(); }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.user = this.getUserObject();
    this.userId = this.user.id;
  }

  refreshUser(msg: string) {
    this.user = this.getUserObject();
    this.userId = this.user.id;
    if (msg == 'success')
      this.showAlertPopup('Success');
      
  }
  okBUttonPressed(msg: string) {
    this.router.navigate(['']);
  }

}
