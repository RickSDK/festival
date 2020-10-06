import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponent } from './base/base.component';
import { BaseColorsComponent } from './base-colors/base-colors.component';
import { BaseHttpComponent } from './base-http/base-http.component';
import { PageShellComponent } from './page-shell/page-shell.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { OptionsComponent } from './options/options.component';
import { ButtonComponent } from './button/button.component';
import { LoginComponent } from './login/login.component';
import { InfoPopupComponent } from './popups/info-popup/info-popup.component';
import { SpinnerComponent } from './popups/spinner/spinner.component';
import { FilmsComponent } from './films/films.component';
import { PeopleComponent } from './people/people.component';
import { AwardsComponent } from './awards/awards.component';
import { SubmitFilmComponent } from './submit-film/submit-film.component';
import { TicketsComponent } from './tickets/tickets.component';
import { ButtonBarComponent } from './button-bar/button-bar.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { JoinComponent } from './join/join.component';
import { AddFilmPopupComponent } from './add-film-popup/add-film-popup.component';
import { FormInputComponent } from './form-input/form-input.component';
import { FormWrapperComponent } from './form-wrapper/form-wrapper.component';
//import { UserProfileComponent } from './user-profile/user-profile.component';
import { DataTableComponent } from './data-table/data-table.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { FilmEditComponent } from './film-edit/film-edit.component';
import { UserImageComponent } from './user-image/user-image.component';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';
import { BadgePromoPopupComponent } from './badge-promo-popup/badge-promo-popup.component';
import { ReviewBarComponent } from './review-bar/review-bar.component';
import { ReviewDetailComponent } from './review-detail/review-detail.component';
import { UserEditPicPopupComponent } from './user-edit-pic-popup/user-edit-pic-popup.component';
import { UserEditProfilePopupComponent } from './user-edit-profile-popup/user-edit-profile-popup.component';
import { FilmSnapshotComponent } from './film-snapshot/film-snapshot.component';
import { BadgeSnapshotComponent } from './badge-snapshot/badge-snapshot.component';
import { UserSnapshotComponent } from './user-snapshot/user-snapshot.component';
import { CastCrewPopupComponent } from './cast-crew-popup/cast-crew-popup.component';
import { UserBarComponent } from './user-bar/user-bar.component';
import { FestivalProgramComponent } from './festival-program/festival-program.component';
import { GuildComponent } from './guild/guild.component';
import { ContactComponent } from './contact/contact.component';
import { HelpWantedComponent } from './help-wanted/help-wanted.component';
import { AboutComponent } from './about/about.component';
import { StaffPageComponent } from './staff-page/staff-page.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    BaseColorsComponent,
    BaseHttpComponent,
    PageShellComponent,
    MainMenuComponent,
    OptionsComponent,
    ButtonComponent,
    LoginComponent,
    InfoPopupComponent,
    SpinnerComponent,
    FilmsComponent,
    PeopleComponent,
    AwardsComponent,
    SubmitFilmComponent,
    TicketsComponent,
    ButtonBarComponent,
    BottomBarComponent,
    JoinComponent,
    AddFilmPopupComponent,
    FormInputComponent,
    FormWrapperComponent,
    DataTableComponent,
    UserDetailComponent,
    FilmDetailComponent,
    FilmEditComponent,
    UserImageComponent,
    LoadingBarComponent,
    BadgePromoPopupComponent,
    ReviewBarComponent,
    ReviewDetailComponent,
    UserEditPicPopupComponent,
    UserEditProfilePopupComponent,
    FilmSnapshotComponent,
    BadgeSnapshotComponent,
    UserSnapshotComponent,
    CastCrewPopupComponent,
    UserBarComponent,
    FestivalProgramComponent,
    GuildComponent,
    ContactComponent,
    HelpWantedComponent,
    AboutComponent,
    StaffPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
