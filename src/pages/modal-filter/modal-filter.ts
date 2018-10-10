import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { LogUtil } from '../../utils/logutil';

/**
 * Generated class for the ModalFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-filter',
  templateUrl: 'modal-filter.html',
})
export class ModalFilterPage {

  static TAG:string = 'ModalFilterPage'

  filter: {} = {
    naskahUnit: "",
    naskahSifat: ""
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private view: ViewController
  ) {
  }

  ionViewDidLoad() {
    LogUtil.d(ModalFilterPage.TAG, 'ionViewDidLoad ModalFilterPage');
    this.filter = this.navParams.get('filter')
  }

  closeModal() {
    this.view.dismiss(null);
  }

  closeWithReturn() {
    this.view.dismiss(this.filter);
  }

}
