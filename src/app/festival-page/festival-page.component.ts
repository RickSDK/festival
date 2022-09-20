import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseHttpComponent } from '../base-http/base-http.component';
import { LoginComponent } from '../login/login.component';
import { Film } from '../classes/film';

declare var $: any;

@Component({
  selector: 'app-festival-page',
  templateUrl: './festival-page.component.html',
  styleUrls: ['./festival-page.component.scss']
})
export class FestivalPageComponent extends BaseHttpComponent implements OnInit {
  public filmYear: number = 0;
  public films: any;
  public displayFilms: any;
  public winners: any = [];
  public fileToUpload: File = null;
  public inputFieldObj: any = {};
  public showSubmitButtonFlg = false;
  public mainImgSrc = '';



  public promoUrl = 'https://www.youtube.com/embed/St4wbagIMuI';
  public promoUrlScrubbed = this.sanitizer.bypassSecurityTrustUrl('https://www.youtube.com/embed/St4wbagIMuI');
  public data: any = {
    promoUrl: 'https://www.youtube.com/embed/St4wbagIMuI'
  }

  constructor(private route: ActivatedRoute, public sanitizer: DomSanitizer) { super(); }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.filmYear = params.filmYear;
        this.getData();
      });
  }

  embededURL() {
    return this.sanitizer.bypassSecurityTrustUrl(this.promoUrl);
  }
  getData() {
    this.user = this.getUserObject();
    var src = 'http://www.appdigity.com/fest/mainImages/main' + this.filmYear + '.jpg';



    if (this.filmYear == 2021 || this.filmYear == 2022)
      this.mainImgSrc = src;
    else
      this.mainImgSrc = '';

    this.userId = this.user.id;
    this.films = [];
    this.displayFilms = [];
    console.log('this.filmYear', this.filmYear);
    this.loadingFlg = true;
    var params = {
      userId: this.user.id,
      code: this.user.code,
      festivalYear: this.filmYear,
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
      if (this.filmYear == film.festivalYear)
        displayFilms.push(film);
    });
    this.displayFilms = displayFilms;
    this.populateWinners();
  }
  populateWinners() {
    console.log(this.displayFilms)
    this.winners = [];
    if (this.filmYear == 2021)
    this.winners = [
      { 'name': 'Best Director', film: this.displayFilms[13] },
      { 'name': 'Best Actor', film: this.displayFilms[8], winnerName: 'Ben Wade' },
      { 'name': 'Best Comedy', film: this.displayFilms[19] },
      { 'name': 'Best Drama', film: this.displayFilms[24] },
      { 'name': 'Best Editing', film: this.displayFilms[13] },
    ];

    if (this.filmYear == 2022)
      this.winners = [
        { 'name': 'Best Sound/Music', film: this.displayFilms[41], winnerName: 'Topher Horn' },
        { 'name': 'Best Editing', film: this.displayFilms[33], winnerName: 'Erin Pederson' },
        { 'name': 'Best Support Performance', film: this.displayFilms[37], winnerName: 'Trin Miller' },
        { 'name': 'Best Child Performance', film: this.displayFilms[41], winnerName: 'Adelaide St. John' },
        { 'name': 'Best Script', film: this.displayFilms[4], winnerName: 'A.S. Templeton' },
        { 'name': 'Best Comedy', film: this.displayFilms[32] },
        { 'name': 'Best Documentary', film: this.displayFilms[40] },
        { 'name': 'Best Drama', film: this.displayFilms[43] },
        { 'name': 'Best Horror', film: this.displayFilms[18] },
        { 'name': 'Best Music Video', film: this.displayFilms[26] },
        { 'name': 'Best Sci-fi', film: this.displayFilms[41] },
        { 'name': 'Best Actor', film: this.displayFilms[42], winnerName: 'Tom Walton' },
        { 'name': 'Best Actress', film: this.displayFilms[27], winnerName: 'Angela DiMarco' },
        { 'name': 'Best Director', film: this.displayFilms[18], winnerName: 'Kit Wilson' },
        { 'name': 'Best Picture', film: this.displayFilms[27], winnerName: 'Tony Doupe' },
      ];

  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    var reader = new FileReader();
    reader.onload = imageIsLoaded;
    reader.readAsDataURL(this.fileToUpload);

    setTimeout(() => {
      this.checkImageSize();
    }, 500);
  }
  checkImageSize() {
    var src = $('#myImg').attr('src');
    this.inputFieldObj.value = src;
    //    this.validateField(this.inputFieldObj);
    console.log('bytes: ', src.length);
    this.showSubmitButtonFlg = true;
    if (src.length > 2000000) {
      this.inputFieldObj.errorMessage = 'file too large. please shrink it down (under 2MB) and then upload it again.';
    }
  }
  updateImageButtonClicked(msg: string) {
    this.showSubmitButtonFlg = false;
    var params = {
      festivalYear: this.filmYear,
      userId: this.user.id,
      code: this.user.code,
      action: 'updateMainImage',
      image: this.inputFieldObj.value
    };
    console.log(params)
    this.executeApi('festApi.php', params, true);
  }

}
function imageIsLoaded(e) {
  $('#myImg').attr('src', e.target.result);
};
