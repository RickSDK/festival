/*import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseHttpComponent } from '../base-http/base-http.component';
import { User } from '../classes/user';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent extends BaseHttpComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();
  public tableObj: any
  public makerFlg = false;
  public crewFlg = false;
  public actorFlg = false;
  public deleteFlg = false;
  public errorMessage:string;

  public avatarObj = { name: 'Profile Picture', type: 'picture', value: '', hint: 'An image that you would like to represent yourself.' };
  public firstNameObj = { name: 'First Name', type: 'text', value: '', max: 50, requiredFlg: true, disabledFlg: false };
  public lastNameObj = { name: 'Last Name', type: 'text', value: '', max: 50, requiredFlg: true, disabledFlg: false };
  public emailObj = { name: 'Email', type: 'email', value: '', max: 100, requiredFlg: true, disabledFlg: false };


  public formFields1 = [
    this.avatarObj
  ];
  public formFields2 = [
    this.firstNameObj,
    this.lastNameObj,
    this.emailObj,
  ];
  public editImageFlg = false;
  public editDetailsFlg = false;
  constructor(private router: Router) { super(); }

  ngOnInit(): void {
  }
  show() {
    this.user = this.getUserObject();
    this.deleteFlg = false;
    this.errorMessage = '';
    this.editImageFlg = false;
    this.editDetailsFlg = false;
    this.makerFlg = this.user.filmFlg;
    this.crewFlg = this.user.crewFlg;
    this.actorFlg = this.user.actorFlg;
    this.firstNameObj.value = this.user.firstName;
    this.lastNameObj.value = this.user.lastName;
    this.emailObj.value = this.user.email;
    this.firstNameObj.disabledFlg = false;
    this.lastNameObj.disabledFlg = false;
    this.emailObj.disabledFlg = false;
    this.buttonIdx = this.user.avatar;;
    var tableObj = { name: 'User Profile', data: [] };
    tableObj.data.push({ title: 'Id', value: this.user.id })
    tableObj.data.push({ title: 'Username', value: this.user.username })
    tableObj.data.push({ title: 'First Name', value: this.user.firstName })
    tableObj.data.push({ title: 'Last Name', value: this.user.lastName })
    tableObj.data.push({ title: 'Email', value: this.user.email })
    this.tableObj = tableObj;
    this.loadingFlg = false;
    $('#userProfileModal').modal();
  }
  logout() {
    localStorage.email = '';
    localStorage.firstName = '';
    localStorage.username = '';
    localStorage.password = '';
    localStorage.userId = '';
    localStorage.userObj = '';
    this.messageEvent.emit('done');
    this.closeModal('#userProfileModal');
  }
  ngClassBox(checked: boolean) {
    if (checked)
      return 'fa fa-check-square-o';
    else
      return 'fa fa-square-o';
  }
  makerClicked() {
    this.makerFlg = !this.makerFlg;
    this.changesMadeFlg = true;
  }
  crewClicked() {
    this.crewFlg = !this.crewFlg;
    this.changesMadeFlg = true;
  }
  actorClicked() {
    this.actorFlg = !this.actorFlg;
    this.changesMadeFlg = true;
  }
  updateImageButtonClicked(msg: string) {
    this.changesMadeFlg = false;
    this.loadingFlg = true;
    var params = {
      userId: this.user.id,
      code: this.user.code,
      avatar: this.buttonIdx,
      image: this.avatarObj.value,
      action: 'editUserImage',
    };
    console.log(params);
    this.user.avatar = this.buttonIdx;
    this.user.avatarFlg = (this.avatarObj.value.length > 0);
    console.log(this.user);
    localStorage.userObj = JSON.stringify(this.user);
    this.executeApi('festApi.php', params, true);
  }
  updateDetailsButtonClicked(msg: string) {
    this.changesMadeFlg = false;
    this.loadingFlg = true;
    var params = {
      userId: this.user.id,
      code: this.user.code,
      action: 'editUser',
      firstName: this.firstNameObj.value,
      lastName: this.lastNameObj.value,
      email: this.emailObj.value,
      filmFlg: (this.makerFlg) ? 'Y' : '',
      crewFlg: (this.crewFlg) ? 'Y' : '',
      actorFlg: (this.actorFlg) ? 'Y' : '',
    };
    this.user.firstName = this.firstNameObj.value;
    this.user.lastName = this.lastNameObj.value;
    this.user.email = this.emailObj.value;
    this.user.filmFlg = params.filmFlg;
    this.user.crewFlg = params.crewFlg;
    this.user.actorFlg = params.actorFlg;
    localStorage.userObj = JSON.stringify(this.user);
    this.executeApi('festApi.php', params, true);
  }
  deleteUser() {
    this.loadingFlg = true;
    var params = {
      userId: this.user.id,
      code: this.user.code,
      action: 'deleteUser',
    };
    this.executeApi('festApi.php', params, true);
  }
  postSuccessApi(file: string, data: string) {
    this.loadingFlg = false;
    if(this.deleteFlg) {
      this.logout();
      this.router.navigate(['']);
    } else {
      this.closeModal('#userProfileModal');
      this.messageEvent.emit('done');
    }
  }
  postErrorApi(file: string, error: string) {
    this.loadingFlg = false;
    this.errorMessage = error;
    console.log('postErrorApi', error);
  }
  changeAvatar(num: number) {
    this.buttonIdx = num;
    this.changesMadeFlg = true;
  }
}
*/