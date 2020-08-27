import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

declare var $: any;

@Component({
  selector: 'app-badge-promo-popup',
  templateUrl: './badge-promo-popup.component.html',
  styleUrls: ['./badge-promo-popup.component.scss']
})
export class BadgePromoPopupComponent extends BaseComponent implements OnInit {
  public badgeName: string = '';

  constructor() { super(); }

  ngOnInit(): void {
  }
  show(badgeName: string) {
    this.badgeName = badgeName;
    $('#badgePromoPopup').modal();
  }
  okButtonPressed() {
    this.closeModal('#badgePromoPopup');
  }
}
