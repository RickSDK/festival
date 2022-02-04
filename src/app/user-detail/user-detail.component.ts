import { Component, OnInit } from '@angular/core';
import { BaseHttpComponent } from '../base-http/base-http.component';
import { User } from '../classes/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent extends BaseHttpComponent implements OnInit {
  public uId: number = 0;
  public displayUser: User;
  public showRefreshButton:boolean = false;
  public showRefreshMessage:boolean = false;
  public tableObj: any;
  public userIsEditableFlg = false;
  public userRoles = [
    { name: 'Owner', icon: 'usd', checkFlg: false },
    { name: 'Board Member', icon: 'black-tie', checkFlg: false },
    { name: 'Super Admin', icon: 'user-secret', checkFlg: false },
    { name: 'Admin', icon: 'lock', checkFlg: false },
    { name: 'Veteran', icon: 'diamond', checkFlg: false },
    { name: 'Guild Member', icon: 'shield', checkFlg: false },
    { name: 'Staff', icon: 'briefcase', checkFlg: false },
    { name: 'Official Critic', icon: 'comments', checkFlg: false },
  ]

  constructor(private router: Router, private route: ActivatedRoute) {
    super();
    this.route.queryParams
      .subscribe(params => {
        this.uId = params.id;
        this.getData();
      });
    
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.user = this.getUserObject();
    this.userId = this.user.id;
  }
  refreshPic(msg:string) {
    console.log('refreshPic');
    this.user = this.getUserObject();
    this.displayUser.avatarFlg = this.user.avatarFlg;
    this.displayUser.avatar =  this.user.avatar;
    this.showRefreshButton = true;
    this.loadingFlg = false;
  }
  refreshThePicPressed() {
    this.showRefreshMessage = true;
    this.refreshPic('done');
  }
  refreshProfile(msg:string) {
    console.log('refreshProfile');
    this.loadingFlg = false;
    this.getData();
  }
  getData() {

    this.showRefreshButton = false;
    this.showRefreshMessage = false;
    var params = {
      row_id: this.uId,
      action: 'getUser'
    };
    this.executeApi('festApi.php', params, true);
  }
  upgradeToAdmin(name:string) {
    var params = {
      row_id: this.uId,
      userId: this.user.id,
      code: this.user.code,
      action: name
    };
    console.log(params);
    this.executeApi('festApi.php', params, true);
  }
  postSuccessApi(file: string, data: string) {
    console.log('postSuccessApi', file, data);

    var lines = data.split('<b>');
    lines.forEach(line => {
      var user = new User(line);
      console.log('user', user);
      if (user.id)
        this.displayUser = user;
    });
    if(!this.displayUser)
    this.displayUser = new User('');

    this.userIsEditableFlg = (this.uId == this.userId);
    this.userRoles[0].checkFlg = this.displayUser.ownerFlg;
    this.userRoles[1].checkFlg = this.displayUser.boardFlg;
    this.userRoles[2].checkFlg = this.displayUser.superAdminFlg;
    this.userRoles[3].checkFlg = this.displayUser.adminFlg;
    this.userRoles[4].checkFlg = this.displayUser.veteranFlg;
    this.userRoles[5].checkFlg = this.displayUser.guildMemberFlg;
    this.userRoles[6].checkFlg = this.displayUser.staffFlg;
    this.userRoles[7].checkFlg = this.displayUser.criticFlg;

    var tableObj = { name: this.displayUser.username, data: [] };
    tableObj.data.push({ title: 'Reputation Points', value: this.displayUser.points })
    tableObj.data.push({ title: 'Films', value: this.displayUser.filmCount })
    this.tableObj = tableObj;

    console.log('postSuccessApi', this.displayUser);
  }
  editUser(usr: any, imageFlg: boolean) {
    console.log(usr, this.user)
  }
  editProfilePic() {

  }
  logout() {
    localStorage.email = '';
    localStorage.firstName = '';
    localStorage.username = '';
    localStorage.password = '';
    localStorage.userId = '';
    localStorage.userObj = '';
    this.router.navigate(['']);
  }
  /*  updateImageButtonClicked(msg: string) {
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
    }*/
}
