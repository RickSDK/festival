import { Component, OnInit, Injectable, Output, EventEmitter } from '@angular/core';
import { BaseHttpComponent } from '../base-http/base-http.component';
import { User } from '../classes/user';

declare var $: any;
declare var getTextFieldValue: any;
declare var FB: any;
declare var showPopup: any;

// create new league
// insert into PO_LEAGUE(row_id, admin_id, name, numWeeks, week, season, created) values(null, 3, 'El Corona Club', 12, 1, 1, sysdate())

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class LoginComponent extends BaseHttpComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();
  public userName = localStorage.firstName;
  public createAccountFlg: boolean = false;
  public emailSentFlg: boolean = false;
  public showCreateAccountFlg: boolean = false;
  public errorMessage: string = '';
  public userId: number = 0;
  public makerFlg = false;
  public crewFlg = false;
  public actorFlg = false;
  public showLoginFlg = false;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
  show() {
    this.apiMessage = '';
    this.showLoginFlg = false;
    this.loadingFlg = false;
    this.apiExecutedFlg = false;
    this.createAccountFlg = false;
    this.emailSentFlg = false;
    this.showCreateAccountFlg = false;
    this.errorMessage = '';
    this.user = this.getUserObject();
    this.userId = this.user.id;
    $('#loginPopup').modal();
    setTimeout(() => {
      this.checkFbLogin();
    }, 1000);
  }
  checkFbLogin() {
    FB.getLoginStatus(function(response) {
      console.log('getLoginStatus', response);
    });
  }
  facebookPressed() {
    this.closeModal('#loginPopup');
    showPopup('fbLoginPopup');
  }
  loginPressed() {
    var email = getTextFieldValue('emailField');
    var password = getTextFieldValue('passwordField');
    if (email.length == 0) {
      this.apiMessage = 'Email field is blank';
      return;
    }
    if (password.length == 0) {
      this.apiMessage = 'Password field is blank';
      return;
    }
    localStorage.email = email;
    localStorage.code = btoa(password);
    var params = {
      email: email,
      code: localStorage.code,
      action: 'login'
    };
    this.executeApi('festLogin.php', params, true);
  }
  postSuccessApi(api: string, data: string) {
    var c = data.split('<b>');
    var user: User = new User(c[1], localStorage.code);
    if (user.id > 0) {
      localStorage.firstName = user.firstName;
      localStorage.lastName = user.lastName;
      var username = user.firstName + ' ' + user.lastName;
      if (username.length > 16)
        username = user.firstName + ' ' + user.lastName.substring(0, 1);
      localStorage.username = username;
      localStorage.userId = user.id;
      localStorage.userObj = JSON.stringify(user);
      this.closeModal('#loginPopup');
      this.messageEvent.emit('success');
    } else
      this.apiMessage = data;
  }
  postErrorApi(file: string, error: string) {
    this.apiMessage = error;
    localStorage.email = '';
    localStorage.userId = '';
  }
  okButtonPressed() {
    this.closeModal('#loginPopup');
    //this.messageEvent.emit('success');
  }
  createAccountPressed() {
    this.showCreateAccountFlg = true;
  }
  submitEmailPressed() {
    var email = getTextFieldValue('emailField2');
    var params = {
      email: email,
      action: 'requestPro'
    };
    console.log(params);
    this.executeApi('festLogin.php', params, true);
    this.emailSentFlg = true;
  }
  createPressed() {
    var email = getTextFieldValue('emailField3');
    var firstName = getTextFieldValue('firstName');
    var lastName = getTextFieldValue('lastName');
    var password = getTextFieldValue('passwordField2');
    var password2 = getTextFieldValue('passwordField3');
    if (email == '') {
      this.errorMessage = 'Invalid email';
      return;
    }
    if (firstName == '') {
      this.errorMessage = 'Invalid firstName';
      return;
    }
    if (lastName == '') {
      this.errorMessage = 'Invalid lastName';
      return;
    }
    if (password == '') {
      this.errorMessage = 'Invalid password';
      return;
    }
    if (password != password2) {
      this.errorMessage = 'password dont match';
      return;
    }
    this.showCreateAccountFlg = false;
    var params = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      filmFlg: (this.makerFlg) ? 'Y' : '',
      crewFlg: (this.crewFlg) ? 'Y' : '',
      actorFlg: (this.actorFlg) ? 'Y' : '',
      avatar: this.buttonIdx,
      password: password,
      appName: 'festval1.0',
      action: 'createAccount'
    };
    console.log(params);
    localStorage.email = email;
    localStorage.password = '*****';
    localStorage.code = btoa(password);
    this.executeApi('festLogin.php', params, true);
  }
  ngClassBox(checked: boolean) {
    if (checked)
      return 'fa fa-check-square-o';
    else
      return 'fa fa-square-o';
  }
  makerClicked() {
    this.makerFlg = !this.makerFlg;
  }
  crewClicked() {
    this.crewFlg = !this.crewFlg;
  }
  actorClicked() {
    this.actorFlg = !this.actorFlg;
  }
  logout() {
    localStorage.email = '';
    localStorage.firstName = '';
    localStorage.username = '';
    localStorage.password = '';
    localStorage.userId = '';
    localStorage.userObj = '';
    this.closeModal('#loginPopup');
  }
}

function checkLoginState() {
  console.log('checkLoginState!!!!');
  FB.getLoginStatus(function(response) {
    console.log('XXX getLoginStatus!!', response);
    statusChangeCallback(response);
  });
}
function statusChangeCallback(response) {
  //console.log('response', response)
}
/*
FB.login(function(response) {
  console.log('FB.login', response);
  if (response.status === 'connected') {
    // Logged into your webpage and Facebook.
  } else {
    // The person is not logged into your webpage or we are unable to tell. 
  }
}, {scope: 'public_profile,email'});

FB.logout(function(response) {
  console.log('FB.logout', response);
});*/
