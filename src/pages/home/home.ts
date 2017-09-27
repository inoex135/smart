import { Component, ViewChild } from "@angular/core";
import { NavController, PopoverController, Slides } from "ionic-angular";
import { UserProvider } from "../../providers/user/user";
import { LoginPage } from "../login/login";
import { SuratPage } from "../surat/surat";
import { PersonalPage } from "../personal/personal";
import { AptPage } from "../apt/apt";
import { HomePopoverPage } from "../home-popover/home-popover";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  @ViewChild("slider") slider: Slides;

  public menus: Array<any> = [];
  slides = [
    {
      title: "Dream's Adventure",
      imageUrl:
        "https://smart.javan.co.id/smart/themes/porto/assets/images/slide-bg.jpg",
      songs: 2,
      private: false
    },
    {
      title: "For the Weekend",
      imageUrl:
        "https://smart.javan.co.id/smart/themes/porto/assets/images/slide-bg.jpg",
      songs: 4,
      private: false
    },
    {
      title: "Family Time",
      imageUrl:
        "https://smart.javan.co.id/smart/themes/porto/assets/images/slide-bg.jpg",
      songs: 5,
      private: true
    },
    {
      title: "My Trip",
      imageUrl:
        "https://smart.javan.co.id/smart/themes/porto/assets/images/slide-bg.jpg",
      songs: 12,
      private: true
    }
  ];

  constructor(
    public navCtrl: NavController,
    public userProvider: UserProvider,
    public popover: PopoverController
  ) {}

  ionViewDidLoad() {
    this.listMenu();
  }

  listMenu() {
    this.menus = [
      {
        title: "Persuratan",
        icon: "mail",
        component: SuratPage,
        color: "bluesky"
      },
      {
        title: "Personal",
        icon: "person",
        component: PersonalPage,
        color: "blue"
      },
      { title: "APT", icon: "laptop", component: AptPage, color: "orange" }
    ];

    return this.menus;
  }

  pagesTo(component: any) {
    this.navCtrl.push(component);
  }

  presentPopover(event: Event) {
    let popover = this.popover.create(HomePopoverPage);
    popover.present({ ev: event });
  }

  logout() {
    this.userProvider.purgeAuth();
    this.navCtrl.setRoot(LoginPage);
  }
}
