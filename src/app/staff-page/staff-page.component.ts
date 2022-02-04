import { Component, OnInit } from '@angular/core';
import { BaseHttpComponent } from '../base-http/base-http.component';
import { User } from '../classes/user';

@Component({
  selector: 'app-staff-page',
  templateUrl: './staff-page.component.html',
  styleUrls: ['./staff-page.component.scss']
})
export class StaffPageComponent extends BaseHttpComponent implements OnInit {
  public managers: any;
  public advisors: any;
  public guildMembers: any;
  public potentials: any;

  constructor() { super(); }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.user = this.getUserObject();
    this.userId = this.user.id;
    this.loadingFlg = true;
    this.getAPIData(this.user, 'getPeople', false);
  }
  postSuccessApi(file: string, data: string) {
    var lines = data.split('<b>');
    var managers = [];
    var advisors = [];
    var guildMembers = [];
    var potentials = [];
    lines.forEach(line => {
      var user = new User(line);
      console.log(user);
      if (user.id) {
        if (user.ownerFlg)
          managers.push(user);
        else if (user.staffFlg)
          advisors.push(user);
        else if (user.officialGuildFlg)
          guildMembers.push(user);
        else if (user.guildMemberFlg)
          potentials.push(user);

      }
    });
    this.managers = managers;
    this.advisors = advisors;
    this.guildMembers = guildMembers;
    this.potentials = potentials;
  }
}
