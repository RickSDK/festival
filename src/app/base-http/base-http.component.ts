import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { SpinnerComponent } from '../popups/spinner/spinner.component';
import { InfoPopupComponent } from '../popups/info-popup/info-popup.component';

declare var $: any;
declare var getPostDataFromObj: any;

//---------------------------------------
/*  Useage: add these
    <app-info-popup #infoModal></app-info-popup>
    <app-spinner #spinnerPopup></app-spinner>
    */
//---------------------------------------

@Component({
  selector: 'app-base-http',
  templateUrl: './base-http.component.html',
  styleUrls: ['./base-http.component.scss']
})
export class BaseHttpComponent extends BaseComponent implements OnInit {
  @ViewChild(SpinnerComponent) spinnerComponent: SpinnerComponent = new (SpinnerComponent);
  @ViewChild(InfoPopupComponent) infoPopupComponent: InfoPopupComponent = new (InfoPopupComponent);

  public apiMessage: string = '';
  public loadingFlg: boolean = false;
  public apiExecutedFlg: boolean = false;
  public errorMessage: string = '';
  public changesMadeFlg = false;
  public displayYear = new Date().getFullYear();

  constructor() { super(); }

  ngOnInit(): void {
  }
  getHostname() {
    return 'https://www.appdigity.com/fest/';
  }
  showAlertPopup(message: string) {
    this.infoPopupComponent.show(message);
  }
  startSpinner() {
    if (this.spinnerComponent)
      this.spinnerComponent.show();
  }
  setApiMessage(message: string) {
    if (this.spinnerComponent)
      this.spinnerComponent.setApiMessage(message);
  }
  setLoadingMessage(message: string) {
    if (this.spinnerComponent)
      this.spinnerComponent.setLoadingMessage(message);
  }
  stopSpinner() {
    if (this.spinnerComponent)
      this.spinnerComponent.close();
  }
  getAPIData(user: any, action: string, noCacheFlg: boolean) {
    var params = {
      userId: user.id,
      code: user.code,
      action: action
    };
    this.executeApi('festApi.php', params, true);
  }
  executeApi(file: string, params: any = null, displaySuccessFlg: boolean = false) {
    if (!params) {
      params =
      {
        Username: localStorage.email,
        code: localStorage.code
      };
    }
    this.errorMessage = '';
    var url = this.getHostname() + file;
    var postData = getPostDataFromObj(params);
    this.loadingFlg = true;
    this.apiExecutedFlg = true;
    console.log('fetch...', file);
    fetch(url, postData).then((resp) => resp.text())
      .then((data) => {
        this.loadingFlg = false;
        if (this.verifyServerResponse(data)) {
          this.postSuccessApi(file, data);
        } else {
          this.postErrorApi(file, data);
        }
      })
      .catch(error => {
        this.loadingFlg = false;
        this.postErrorApi(file, error);
      });
  }
  verifyServerResponse(data: string) {
    if (data && data.substring(0, 7) == 'Success' || data.length > 380)
      return true;
    else
      return false;
  }
  postSuccessApi(file: string, data: string) {
    //    if (this.spinnerComponent)
    //      this.spinnerComponent.setApiMessage('Success!');
    console.log('postSuccessApi');
  }
  postErrorApi(file: string, error: string) {
    if (this.spinnerComponent) {
      this.spinnerComponent.show();
      this.spinnerComponent.setApiMessage(error);
    }
    this.loadingFlg = true;
    if (error == '')
      error = 'No success message returned';
    this.errorMessage = 'Error: ' + error;
    console.log('postErrorApi', error);
  }
}

