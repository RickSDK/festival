import { Component, OnInit } from '@angular/core';
import { BaseHttpComponent } from '../base-http/base-http.component';
import { User } from '../classes/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent extends BaseHttpComponent implements OnInit {
  public users: any;
  public roles = [
    { id: 0, name: 'Film Makers', icon: 'film', desc: 'Directors & Producers' },
    { id: 1, name: 'Crew', icon: 'truck', desc: 'Sound, Effects, Camera Ops, Makeup & Crew' },
    { id: 2, name: 'Actors', icon: 'star-o', desc: 'Actors & Talent' },
    { id: 3, name: 'Critics', icon: 'comments', desc: 'Online Movie Critics' },
    { id: 4, name: 'Staff', icon: 'briefcase', desc: 'Snohomish Film Festival Staff' },
    { id: 5, name: 'Guild', icon: 'shield', desc: 'Snohomish Film Festival Guild' },
    { id: 6, name: 'All', icon: 'user', desc: 'Everyone' },
  ]
  constructor(private route: ActivatedRoute) {
    super();
    this.route.queryParams
      .subscribe(params => {
        if (params.buttonIdx > 0)
          this.buttonIdx = params.buttonIdx;
      });
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.user = this.getUserObject();
    this.userId = this.user.id;
    this.loadingFlg = true;
    this.buttonIdx = 5;
    this.getAPIData(this.user, 'getPeople', false);
  }
  postSuccessApi(file: string, data: string) {
    var lines = data.split('<b>');
    var users = [];
    lines.forEach(line => {
      var user = new User(line);
      console.log(user);
      if (user.id)
        users.push(user);
    });
    this.users = users;
    console.log(this.users);
  }
  personMatchesType(person: User, type: number) {
    if (type == 6)
      return true;

    if (person.filmFlg && type == 0)
      return true;
    if (person.crewFlg && type == 1)
      return true;
    if (person.actorFlg && type == 2)
      return true;
    if (person.criticFlg && type == 3)
      return true;
    if (person.staffFlg && type == 4)
      return true;
    if (person.guildMemberFlg && type == 5)
      return true;

    return false;
  }
}
