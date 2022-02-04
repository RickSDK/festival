import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseHttpComponent } from '../base-http/base-http.component';
import { LoginComponent } from '../login/login.component';
import { Film } from '../classes/film';

declare var numberVal: any;
declare var FB: any;

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent extends BaseHttpComponent implements OnInit {
  @ViewChild(LoginComponent) loginComponent: LoginComponent;
  public local: string;
  public displayData: any;
  public sortbyCol = 'Points';
  public sortByAscending = false;
  public league: any;
  public films: any;
  public displayFilms: any;

  constructor() { super(); }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.user = this.getUserObject();
    this.userId = this.user.id;
    console.log('xxx user', this.user);
    if (document.images) {
      var img1 = new Image();
      img1.src = "assets/graphics/film1.jpg";
      var img2 = new Image();
      img2.src = "assets/graphics/film2.jpg";
      var img3 = new Image();
      img3.src = "assets/graphics/film3.jpg";
      var img4 = new Image();
      img4.src = "assets/graphics/film4.jpg";
      var img5 = new Image();
      img5.src = "assets/graphics/film5.jpg";
      var img6 = new Image();
      img6.src = "assets/graphics/film6.jpg";
      var img7 = new Image();
      img7.src = "assets/graphics/film7.jpg";
      var img8 = new Image();
      img8.src = "assets/graphics/film8.jpg";
      var img9 = new Image();
      img9.src = "assets/graphics/film9.jpg";
      var awards = new Image();
      awards.src = "assets/graphics/awards.jpg";
      var tickets2 = new Image();
      tickets2.src = "assets/graphics/tickets2.jpg";
    }

    setTimeout(() => {
      this.checkFBStatus();
    }, 2000);

    this.getData();
    
/*
    FB.getLoginStatus(function (response) {
      statusChangeCallback(response);
    });*/

    /*FB.login(function(response) {
      if (response.status === 'connected') {
        // Logged into your webpage and Facebook.
      } else {
        // The person is not logged into your webpage or we are unable to tell. 
      }
    });*/

  }

  
  getData() {
    this.loadingFlg = true;
    var params = {
      userId: this.user.id,
      code: this.user.code,
      action: 'getFilms'
    };
    this.executeApi('festApi.php', params, true);
  }
  postSuccessApi(file: string, data: string) {
    //console.log(data);
    var lines = data.split('<b>');
    var films = [];
    lines.forEach(line => {
      var film = new Film(line);
      if (film.id)
        films.push(film);
    });
    this.films = films;
    this.filterFilms();
    console.log('postSuccessApi', this.films);
  }
  filterFilms() {
    var displayFilms = [];
    this.films.forEach(film => {
      if (2021 ==  film.festivalYear)
        displayFilms.push(film);
    });
    this.displayFilms = displayFilms;
  }

  checkFBStatus() {
    FB.getLoginStatus(function (response) {
      console.log('main menu FB.getLoginStatus', response);
    });
  }



  buttonClicked(str: string) {
    this.loginComponent.show();
  }

}


