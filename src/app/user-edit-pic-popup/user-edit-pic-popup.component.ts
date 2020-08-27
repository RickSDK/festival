import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseHttpComponent } from '../base-http/base-http.component';
import { User } from '../classes/user';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-user-edit-pic-popup',
  templateUrl: './user-edit-pic-popup.component.html',
  styleUrls: ['./user-edit-pic-popup.component.scss']
})
export class UserEditPicPopupComponent extends BaseHttpComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();
  public formFields = [
    { name: 'Profile Picture', type: 'picture', value: '', hint: 'Choose an image that you would like to represent yourself.' }
  ];
  public changesMadeFlg2: boolean;

  constructor() { super(); }

  ngOnInit(): void {
  }
  show() {
    this.user = this.getUserObject();
    this.changesMadeFlg = false;
    this.changesMadeFlg2 = false;
    $('#editPicPopup').modal();
  }
  changeAvatar(num: number) {
    this.buttonIdx = num;
    this.changesMadeFlg2 = true;
  }
  saveButtonPressed() {
    this.loadingFlg = true;
    this.changesMadeFlg2 = false;
    var params = {
      userId: this.user.id,
      code: this.user.code,
      avatar: this.buttonIdx,
      action: 'editUserAvatar',
    };
    console.log(params);
    this.user.avatar = this.buttonIdx;
    this.user.avatarFlg = false;
    this.executeApi('festApi.php', params, true);
  }
  updateImageButtonClicked(msg: string) {
    this.changesMadeFlg = false;
    this.loadingFlg = true;
    var params = {
      userId: this.user.id,
      code: this.user.code,
      avatar: this.buttonIdx,
      image: this.formFields[0].value,
      action: 'editUserImage',
    };
    console.log(params);
    this.user.avatarFlg = true;
    this.executeApi('festApi.php', params, true);
  }
  postSuccessApi(file: string, data: string) {
    this.loadingFlg = false;
    localStorage.userObj = JSON.stringify(this.user);
    this.closeModal('#editPicPopup');
    this.messageEvent.emit('done');
  }

}
