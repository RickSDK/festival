import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-shell',
  templateUrl: './page-shell.component.html',
  styleUrls: ['./page-shell.component.scss']
})
export class PageShellComponent extends BaseComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();
  @Input('navTitle') navTitle: string = 'navTitle';
  @Input('icon') icon: string = '';
  @Input('rButton') rButton: string = '';
  @Input('lButton') lButton: string = '';
  @Input('userId') userId: number;

  public links = [{name: 'About', route: '/about'}, {name: 'Films', route: '/films'}, {name: 'Submit', route: '/submit'}]
  public showProfileFlg = false;
  public profilePic = "assets/graphics/avatars/user0.png";

  constructor(private router: Router, private _location: Location) { super(); }

  ngOnInit(): void {
    this.user = this.getUserObject();
    if(this.user.avatar>0)
      this.profilePic = 'assets/graphics/avatars/user'+this.user.avatar+'.png';
    
      if(this.user.avatarFlg && this.user.id > 0)
        this.profilePic = 'https://appdigity.com/fest/images/user'+this.user.id+'.jpg'
  }
  ngClassLink(name: String) {
    if(name === this.navTitle)
      return 'main-link active-link';
    else
      return 'main-link'
  }
  backButtonClicked() {
    this._location.back();
  }
  leftButtonPressed() {
    this.messageEvent.emit('');
  }
  rightButtonPressed() {
    this.messageEvent.emit('');
  }
  refreshThisUser(str:string) {
    console.log('right here!!!', str);
    this.router.navigate(['']);
  }
  userLogout() {
    this.userId = 0;
    this.showProfileFlg = false;
    localStorage.email = '';
    localStorage.firstName = '';
    localStorage.username = '';
    localStorage.password = '';
    localStorage.userId = '';
    localStorage.userObj = '';
    this.router.navigate(['']);
  }
}

