import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseHttpComponent } from '../base-http/base-http.component';
import { Film } from '../classes/film';

declare var $: any;

@Component({
  selector: 'app-cast-crew-popup',
  templateUrl: './cast-crew-popup.component.html',
  styleUrls: ['./cast-crew-popup.component.scss']
})
export class CastCrewPopupComponent extends BaseHttpComponent implements OnInit {
  public film: Film;
  public showFormFlg = false;
  public row_id: number = 0;
  public castFields = [
    { name: 'Actor\'s Name', type: 'text', value: '', max: 50, requiredFlg: true, disabledFlg: false },
    { name: 'Role Name in Movie', type: 'text', value: '', max: 50, requiredFlg: true, disabledFlg: false }
  ]
  public crewFields = [
    { name: 'Position (Director, Producer, etc)', type: 'text', value: '', max: 50, requiredFlg: true, disabledFlg: false },
    { name: 'Person\'s Name', type: 'text', value: '', max: 50, requiredFlg: true, disabledFlg: false }
  ];
  public castTableObj = { name: 'Cast', data: [] };
  public crewTableObj = { name: 'Crew', data: [] };
  public castItems = [];
  public crewItems = [];

  constructor() { super(); }

  ngOnInit(): void {
  }
  show(film: Film) {
    this.film = film;
    this.user = this.getUserObject();
    console.log(film);

    this.getData();

    $('#castCrewPopup').modal();
  }
  getData() {
    this.loadingFlg = true;
    var params = {
      userId: this.user.id,
      code: this.user.code,
      film_id: this.film.id,
      action: 'getCastCrew',
    };
    console.log(params);

    this.executeApi('films.php', params, true);
  }
  addNewMember() {
    this.row_id = 0;
    this.showFormFlg = true;
  }
  editItem(item:any) {
    console.log(item);
    this.row_id = item.id;
    this.showFormFlg = true;
    if(item.castFlg) {
      this.castFields[0].value = item.name;
      this.castFields[1].value = item.role;
    } else {
      this.crewFields[0].value = item.role;
      this.crewFields[1].value = item.name;  
    }
  }
  changeType(num:number) {
    this.buttonIdx = num;
    this.row_id = 0;
    this.castFields[0].value = '';
    this.castFields[1].value = '';
    this.crewFields[0].value = '';
    this.crewFields[1].value = '';
    this.showFormFlg = false;
  }
  submitCastButtonClicked(msg: string) {
    this.loadingFlg = true;
    var params = {
      userId: this.user.id,
      code: this.user.code,
      row_id: this.row_id,
      film_id: this.film.id,
      action: 'addCastMember',
      name: this.castFields[0].value,
      role: this.castFields[1].value,
    };
    console.log(params);

    this.executeApi('films.php', params, true);
  }
  submitCrewButtonClicked(msg: string) {
    this.loadingFlg = true;
    var params = {
      userId: this.user.id,
      code: this.user.code,
      action: 'addCrewMember',
      row_id: this.row_id,
      film_id: this.film.id,
      role: this.crewFields[0].value,
      name: this.crewFields[1].value,
    };
    console.log(params);

    this.executeApi('films.php', params, true);
  }
  postSuccessApi(file: string, data: string) {
    this.loadingFlg = false;
    this.showFormFlg = false;
    var peopleLines = data.split('<a>');
    this.castItems = [];
    this.crewItems = [];
    peopleLines.forEach(item => {
      var c = item.split(':');
      if (c.length > 3) {
        var obj = { id: c[0], name: c[1], role: c[2], castFlg: (c[3] == 'Y') };
        if (obj.castFlg)
          this.castItems.push(obj);
        else
          this.crewItems.push(obj);
      }
    });
    this.castFields[0].value = '';
    this.castFields[1].value = '';
    this.crewFields[0].value = '';
    this.crewFields[1].value = '';
    console.log('postSuccessApi', data, this.castItems, this.crewItems);
  }
}
