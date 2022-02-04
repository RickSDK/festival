import { Component, OnInit } from '@angular/core';
import { BaseHttpComponent } from '../base-http/base-http.component';
import { User } from '../classes/user';
import { ActivatedRoute, Router } from '@angular/router';

declare var getTextFieldValue: any;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends BaseHttpComponent implements OnInit {
  public params: any;
  public showFinalMessageFlg = false;

  constructor(private route: ActivatedRoute) {
    super();
    this.route.queryParams
      .subscribe(params => {
        this.params = params;
      });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.user = this.getUserObject();
    this.userId = this.user.id;
  }
  resetPressed() {
    var password = getTextFieldValue('passwordField1');
    var password2 = getTextFieldValue('passwordField2');

    if (password.length == 0) {
      this.apiMessage = 'Password field is blank';
      return;
    }
    if (password.length == 0) {
      this.apiMessage = 'Password field is blank';
      return;
    }
    var params = {
      code: this.params.code,
      userId: this.params.user,
      password: password,
      action: 'resetThisPassword'
    };
    console.log(params);
    this.executeApi('festApi.php', params, true);
  }
  postSuccessApi(api: string, data: string) {
    console.log(data);
      this.showFinalMessageFlg = true;
  }
}
