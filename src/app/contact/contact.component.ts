import { Component, OnInit } from '@angular/core';
import { BaseHttpComponent } from '../base-http/base-http.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends BaseHttpComponent implements OnInit {
  public nameObj = { name: 'Your Name', type: 'text', value: '', max: 50, requiredFlg: true, disabledFlg: false };
  public emailObj = { name: 'Your Email', type: 'text', value: '', max: 50, requiredFlg: true, disabledFlg: false };
  public commentsObj = { name: 'Comments', type: 'textarea', value: '', max: 500, requiredFlg: true, disabledFlg: false };
  public formFields = [this.nameObj, this.emailObj, this.commentsObj];
  public successFlg = false;

  constructor() { super(); }

  ngOnInit(): void {
    this.user = this.getUserObject();
    this.userId = this.user.id;
  }
  submitButtonClicked(msg: string) {
    this.loadingFlg = true;
    var params = {
      name: this.nameObj.value,
      email: this.emailObj.value,
      comments: this.commentsObj.value,
      action: 'postComment',
    };
    console.log(params);

    this.executeApi('festApi.php', params, true);
  }
  postSuccessApi(file: string, data: string) {
    this.loadingFlg = false;
    this.successFlg = true;
  }
}
