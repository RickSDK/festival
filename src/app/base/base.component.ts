import { Component, OnInit } from '@angular/core';
import { BaseColorsComponent } from '../base-colors/base-colors.component';

declare var $: any;

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent extends BaseColorsComponent implements OnInit {
  public title = 'title';
  public buttonIdx = 0;
  public user: any;
  public userId:number = 0;

  constructor() { super(); }

  ngOnInit(): void {
  }
  ngStyleGame(game: any) {
    if (game.wins > 0)
      return { 'background-color': 'green', 'color': 'white' }
    if (game.money > 0)
      return { 'background-color': '#ccffcc', 'color': 'black' }
  }
  ngClassSegment(num: number, buttonIdx: number) {
    if (num == buttonIdx)
      return 'btn btn-primary segmentButton roundButton';
    else
      return 'btn btn-secondary segmentButton roundButton';
  }
  segmentClicked(num: number) {
    this.buttonIdx = num;
  }
  openModal(id: string) {
    $(id).modal();
  }
  closeModal(id: string) {
    $(id).modal('hide');
  }
  getUserObject() {
    return getUserObject();
  }
  refreshUser(str:string) {
    this.user = getUserObject();
    this.userId = this.user.id;
    console.log('refreshUser', this.userId, str);
  }
  packageForLargeText(text:string) {
    text = text.replace(/\|/g, '');
    return text.replace(/\n/g, '[nl]');
  }
}
function getUserObject() {
  
  if(localStorage.userObj) {
    var obj = JSON.parse(localStorage.userObj);
    if(obj && obj.id)
      return obj;
  }


  return { 
    id: localStorage.userId, 
    username: localStorage.username, 
    code: localStorage.code, 
    email: localStorage.email,
    firstName: localStorage.firstName,
    lastName: localStorage.lastName,
  }
}