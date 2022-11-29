import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseHttpComponent } from '../base-http/base-http.component';
import { LoginComponent } from '../login/login.component';
import { Film } from '../classes/film';
import { getSyntheticPropertyName } from '@angular/compiler/src/render3/util';

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
  public festicalStatus = 2;
  public festivalDay = 9;
  public currentMonth = new Date().getMonth() + 1;
  public currentDay = new Date().getDate();
  public specialMessage = '';
  public festivalHasEnded = false;

  public awards = [
    { name: 'Drama', films: ['Kitsune', 'Moving On', 'My Happy Place', 'Neshamah', 'Stay'] },
    { name: 'Comedy', films: ['Manly Men of the Mountains', 'Mike Sizzer | a Chair Wrestling Documentary', 'Milk Dreams', 'Mother\'s Day', 'The Opener'] },
    { name: 'Music Video', films: ['Cuz You\'re My Girl', 'Feel it to Heal it', 'Marble - Red Room'] },
    { name: 'Horror', films: ['Balloon', 'The House', 'Kurt', 'Nowhere to Escape', 'Something Behind the Walls'] },
    { name: 'Documentary', films: ['The Ghosts They Carry', 'My Happy Place'] },
    { name: 'Sci-fi/Fantasy', films: ['Amisdst the Stars', 'The Artifact', 'Kitsune'] },
    { name: 'Best Script', films: ['Assembly By Boredom', 'High Tea', 'Perfect Teeth', 'Thingamajigs'] },
    { name: 'Best Picture', films: ['The Ghosts They Carry', 'Kitsune', 'Manly Men of the Mountains', 'Neshamah', 'Stay'] },
    { name: 'Best Director', films: ['Angela DiMarco (STAY) ', 'Joshua Woodcock - Kitsune', 'Kit Wilson - Something behind the walls', 'Tony Doupe - NESHAMAH', 'Zyuan Wang - Nowhere To Escape'] },
    { name: 'Best Actor', films: ['David Over - Mike Sizzer | a Chair Wrestling Documentary', 'J.S. Tate for Kitsune', 'Richard Snyder for Neshamah', 'Tom Walton AMIDST THE STARS'] },
    { name: 'Best Actress', films: ['Angela DiMarco for NESHAMAH', 'Angela DiMarco for Something Behind the Walls', 'Kara Puerschner STAY', 'Trin Miller ROOM 13'] },
    { name: 'Child Actor', films: ['Adelaide St John KITSUNE', 'Lucas Oktay STAY'] },
    { name: 'Sound/Music', films: ['KITSUNE', 'Neshamah', 'Stay'] },
    { name: 'Editing', films: ['COLOR OF THE SKY', 'Cuz You My Girl', 'My Happy Place', 'Something Behind The Walls'] },
  ];

  // 0 = not submitting yet
  // 1 = accepting projects
  // 2 = closed

  constructor() { super(); }

  ngOnInit(): void {
    if (this.currentMonth == 10 || (this.currentMonth == 9 && this.currentDay > this.festivalDay))
      this.festivalHasEnded = true;
    this.specialMessage = '';
    if (this.currentMonth == 9 && this.currentDay <= this.festivalDay) {
      this.specialMessage = 'This Month!';
      if (this.currentDay + 7 > this.festivalDay)
        this.specialMessage = 'This Saturday!';
      if (this.currentDay + 1 == this.festivalDay)
        this.specialMessage = 'Tomorrow!';
      if (this.currentDay == this.festivalDay)
        this.specialMessage = 'Today!';
    }
    window.scrollTo(0, 0);
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
      festivalYear: this.displayYear,
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
      if (this.displayYear == film.festivalYear)
        displayFilms.push(film);
    });
    this.displayFilms = displayFilms;
  }

  refreshUser(str: string) {
    this.user = this.getUserObject();
    this.userId = this.user.id;
    console.log('refreshUserXXX', this.userId, str);
  }

  checkFBStatus() {
    // FB.getLoginStatus(function (response) {
    //  console.log('main menu FB.getLoginStatus', response);
    //});

  }



  buttonClicked(str: string) {
    console.log('buttonClicked', str);
    this.loginComponent.show();
  }

}


