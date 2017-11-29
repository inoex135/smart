import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { AptAction } from "../../constant/apt-action";
import { AptProvider } from "../../providers/apt/apt";
import { LoaderHelper } from "../../helpers/loader-helper";
@Component({
  selector: "page-apt-detail-action",
  templateUrl: "apt-detail-action.html"
})
export class AptDetailActionPage {
  action: string;
  itemId: number;
  

  readonly APT_ACTION = AptAction;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    private loaderHelper: LoaderHelper) 
  	{}

  ionViewDidLoad() {
    this.action = this.navParams.get("action");
    this.itemId = this.navParams.get("itemId");
    
  }

   

}
