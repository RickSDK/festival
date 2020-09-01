import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseHttpComponent } from '../base-http/base-http.component';
import { User } from '../classes/user';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-user-edit-profile-popup',
  templateUrl: './user-edit-profile-popup.component.html',
  styleUrls: ['./user-edit-profile-popup.component.scss']
})
export class UserEditProfilePopupComponent extends BaseHttpComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();
  public firstNameObj = { name: 'First Name', type: 'text', value: '', max: 50, requiredFlg: true, disabledFlg: false };
  public lastNameObj = { name: 'Last Name', type: 'text', value: '', max: 50, requiredFlg: true, disabledFlg: false };
  public emailObj = { name: 'Email', type: 'email', value: '', max: 100, requiredFlg: true, disabledFlg: false };
  public imdbObj = { name: 'IMDb Link', type: 'text', value: '', max: 100, placeholder: 'http://', disabledFlg: false };
  public bioObj = { name: 'Bio', type: 'textarea', value: '', max: 700, disabledFlg: false };
  public facebookObj = { name: 'Faebook Link', type: 'text', value: '', placeholder: 'http://', max: 100, disabledFlg: false };
  public twitterObj = { name: 'Twitter Link', type: 'text', value: '', placeholder: 'http://', max: 100, disabledFlg: false };
  public instagramObj = { name: 'Instagram Link', type: 'text', value: '', placeholder: 'http://', max: 100, disabledFlg: false };
 // public makerFlg = false;
  //public crewFlg = false;
  //public actorFlg = false;
  public deleteFlg = false;
  public loadingFlg2:boolean = false;

  public formFields = [
    this.firstNameObj,
    this.lastNameObj,
    this.emailObj,
    this.bioObj,
    this.imdbObj,
    this.facebookObj,
    this.twitterObj,
    this.instagramObj,
  ];
  constructor(private router: Router) { super(); }

  ngOnInit(): void {
  }
  show(user:User) {
    var localUser = user;
    this.user = this.getUserObject();
    this.firstNameObj.value = this.user.firstName;
    this.lastNameObj.value = this.user.lastName;
    this.emailObj.value = localUser.email;
    this.imdbObj.value = localUser.imdb;
    this.bioObj.value = localUser.bio;
    this.facebookObj.value = localUser.facebook;
    this.twitterObj.value = localUser.twitter;
    this.instagramObj.value = localUser.instagram;

    this.loadingFlg = false;
    this.loadingFlg2 = false;
    $('#editProfilePopup').modal();
  }
/*  ngClassBox(checked: boolean) {
    if (checked)
      return 'fa fa-check-square-o';
    else
      return 'fa fa-square-o';
  }*/
/*  makerClicked() {
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
  }*/
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
      imdb: this.imdbObj.value,
      bio: this.packageForLargeText(this.bioObj.value),
      facebook: this.facebookObj.value,
      twitter: this.twitterObj.value,
      instagram: this.instagramObj.value,
    };
    console.log(params);
    this.user.firstName = this.firstNameObj.value;
    this.user.lastName = this.lastNameObj.value;
    this.user.email = this.emailObj.value;
    localStorage.userObj = JSON.stringify(this.user);
    this.executeApi('festApi.php', params, true);
  }
  deleteUser() {
    this.loadingFlg2 = true;
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
      this.closeModal('#editProfilePopup');
      this.messageEvent.emit('done');
    }
  }
  logout() {
    localStorage.email = '';
    localStorage.firstName = '';
    localStorage.username = '';
    localStorage.password = '';
    localStorage.userId = '';
    localStorage.userObj = '';
    this.messageEvent.emit('done');
    this.closeModal('#editProfilePopup');
  }

}
