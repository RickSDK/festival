import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BaseHttpComponent } from '../base-http/base-http.component';
import { BadgePromoPopupComponent } from '../badge-promo-popup/badge-promo-popup.component';
import { User } from '../classes/user';

declare var dismisPopup: any;
declare var showPopup: any;

@Component({
  selector: 'app-user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.scss']
})
export class UserBarComponent extends BaseHttpComponent implements OnInit {
  @ViewChild(BadgePromoPopupComponent) badgePromoPopupComponent: BadgePromoPopupComponent;
  @Input('icon') icon: string = '';
  @Input('userId') userId: number = 0;
  public badgeFlg: boolean = false;
  public pointSign: string = '';
  public pointDiff: number = 0;
  constructor() { super(); }

  ngOnInit(): void {
    this.user = this.getUserObject();
    if (this.user.id)
      this.getStats(this.user.id);
  }
  openLogoutPopup() {
    //    this.userProfileComponent.show();
  }
  refreshLocalUser(str: string) {
    this.userId = 0;
    this.refreshUser(str);
  }
  completeLogin() {
    dismisPopup('clickHereDiv1');
    console.log('xxx', localStorage.facebookName);
    console.log('xxx', localStorage.facebookId);
    var params = {
      action: 'facebookLogin',
      name: localStorage.facebookName,
      id: localStorage.facebookId
    };
    console.log('params', params);
    this.executeApi('festLogin.php', params, true);
  }
  getStats(userId: number) {
    this.badgeFlg = false;
    this.pointDiff = 0;

    var params = {
      userId: userId,
    };
    this.executeApi('festStats.php', params, true);
  }
  postSuccessApi(api: string, data: string) {
    console.log(api, data);
    if(api == 'festLogin.php') {
      var c = data.split('|');
      console.log('xxx', c, data);
      localStorage.userId = Number(c[3]);
      this.user.id = Number(c[3]);
      this.userId = Number(c[3]);
      this.user.points = Number(c[4]);
      this.user.filmCount = Number(c[19]);
      this.user.badgeCount = Number(c[20]);
      this.user.emailCount = 0;
      this.user.reviewCount = Number(c[21]);
      localStorage.username = c[22];
      this.user.username = c[22];
      this.user.code = btoa(localStorage.facebookId);
      localStorage.userObj = JSON.stringify(this.user);
      console.log(this.user);
      showPopup('clickHereDiv2');
      this.getStats(this.user.id);
    } else {
      var c = data.split('|');
      let points = Number(c[1]);
      let badgeCount = Number(c[2]);
      let emailCount = Number(c[3]);
      
      if (points != this.user.points || badgeCount != this.user.badgeCount || emailCount != this.user.emailCount)
        this.updateUserWithNewStuff(points, badgeCount, emailCount);
    }

  }
  updateUserWithNewStuff(points: number, badgeCount: number, emailCount: number) {
    var userBadgeCount = this.user.badgeCount || 0;
    this.pointDiff = points - this.user.points;
    this.pointSign = (this.pointDiff < 0) ? '' : '+';
    this.badgeFlg = badgeCount > userBadgeCount;
    if (this.badgeFlg) {
      var tada = new Audio('assets/sounds/tada.mp3');
      tada.play();
      this.badgePromoPopupComponent.show('test');

    }

    this.user.points = points;
    this.user.badgeCount = badgeCount;
    this.user.emailCount = emailCount;
    localStorage.userObj = JSON.stringify(this.user);

  }
}
