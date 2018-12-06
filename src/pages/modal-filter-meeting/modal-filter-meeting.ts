import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { LogUtil } from '../../utils/logutil';
import { MeetingProvider } from '../../providers/meeting/meeting';

/**
 * Generated class for the ModalFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-filter',
  templateUrl: 'modal-filter-meeting.html',
})
export class ModalFilterMeetingPage {

  static TAG:string = 'ModalFilterMeetingPage'

  filter:any = {}

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private view: ViewController,
    private api: MeetingProvider
  ) {
  }

  ionViewDidLoad() {
    LogUtil.d(ModalFilterMeetingPage.TAG, 'ionViewDidLoad');
    this.filter = this.navParams.get('filter')
  }

  closeModal() {
    this.view.dismiss(null);
  }

  closeWithReturn() {
    this.view.dismiss(this.filter);
  }

}
