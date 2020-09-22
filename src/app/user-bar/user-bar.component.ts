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
      lastUpd: localStorage.lastUpd,
    };
    this.executeApi('festStats.php', params, true);
  }
  postSuccessApi(api: string, data: string) {
    console.log(api, data);
    if (api == 'festLogin.php') {
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
    }
    if (api == 'festStats.php') {
      if (data.length > 20)
        this.updateUserWithNewStuff(data);

    }

  }
  updateUserWithNewStuff(data: string) {
    console.log('user-bar!!!');
    var components = data.split('<b>');
    var newUser = new User(components[1]);
    console.log('updating to this: newUser', newUser)
    console.log('this.user', this.user)

    this.pointDiff = newUser.points - this.user.points;
    this.pointSign = (this.pointDiff < 0) ? '' : '+';
    this.badgeFlg = newUser.badgeCount > this.user.badgeCount;
    if (newUser.guildMemberFlg && !this.user.guildMemberFlg)
      this.badgeFlg = true;

    if (this.badgeFlg) {
      var tada = new Audio('assets/sounds/tada.mp3');
      //tada.play();
      this.badgePromoPopupComponent.show('test');
    }

    this.user.points = newUser.points;
    this.user.badgeCount = newUser.badgeCount;
    this.user.emailCount = newUser.emailCount;

    this.user.actorFlg = newUser.actorFlg;
    this.user.adminFlg = newUser.adminFlg;
    this.user.boardFlg = newUser.boardFlg;
    this.user.crewFlg = newUser.crewFlg;
    this.user.criticFlg = newUser.criticFlg;
    this.user.filmCount = newUser.filmCount;
    this.user.filmFlg = newUser.filmFlg;
    this.user.guildMemberFlg = newUser.guildMemberFlg;
    this.user.ownerFlg = newUser.ownerFlg;
    this.user.staffFlg = newUser.staffFlg;
    this.user.superAdminFlg = newUser.superAdminFlg;
    this.user.veteranFlg = newUser.veteranFlg;

    localStorage.userObj = JSON.stringify(this.user);
    localStorage.lastUpd = newUser.lastUpd;

  }
}
