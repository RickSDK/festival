import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BaseHttpComponent } from '../base-http/base-http.component';
import { BadgePromoPopupComponent } from '../badge-promo-popup/badge-promo-popup.component';
import { User } from '../classes/user';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent extends BaseHttpComponent implements OnInit {
//  @ViewChild(UserProfileComponent) userProfileComponent: UserProfileComponent;
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
  getStats(userId: number) {
    this.badgeFlg = false;
    this.pointDiff = 0;

    var params = {
      userId: userId,
    };
    this.executeApi('festStats.php', params, true);
  }
  postSuccessApi(api: string, data: string) {
    var c = data.split('|');
    let points = Number(c[1]);
    let badgeCount = Number(c[2]);
    let emailCount = Number(c[3]);
    if (points != this.user.points || badgeCount != this.user.badgeCount || emailCount != this.user.emailCount)
      this.updateUserWithNewStuff(points, badgeCount, emailCount);
  }
  updateUserWithNewStuff(points: number, badgeCount: number, emailCount: number) {
    var userBadgeCount = this.user.badgeCount || 0;
    this.pointDiff = points - this.user.points;
    this.pointSign = (this.pointDiff < 0) ? '' : '+';
    this.badgeFlg = badgeCount > userBadgeCount;
    if(this.badgeFlg) {
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
