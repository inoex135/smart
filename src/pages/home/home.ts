import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController, Platform, IonicPage, Select, Slides } from "ionic-angular";
import { UserProvider } from "../../providers/user/user";

import { MenuHomeConstant } from "../../constant/menu-home";
import { HomeProvider } from "../../providers/home/home";

import { LoaderHelper } from "../../helpers/loader-helper";
import { FCM } from "@ionic-native/fcm";
import { TokenProvider } from "../../providers/token/token";
import { LogUtil } from "../../utils/logutil";
import { NotificationBell } from "../../components/notification-bell/notification-bell";
import { NotificationProvider } from "../../providers/notification/notification";
import { ERROR_CODES } from "../../constant/error-codes";
import { PaymentHistoryPage } from "../payment-history/payment-history";
import { SuratPage } from "../surat/surat";
import { AptPage } from "../apt/apt";
import { PersonalPage } from "../personal/personal";
import { MeetingListPage } from "../meeting-list/meeting-list";
import { Dashboard } from "./models/dashboard";
import { deserialize } from "serializer.ts/Serializer";
import { DashboardContract } from "./models/dashboard-contract";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {

  TAG:string = 'HomePage'

  @ViewChild("profileImage") image: ElementRef
  @ViewChild("selectUser") select: Select
  @ViewChild("bell") bell: NotificationBell
  @ViewChild(Slides) slides: Slides;

  menus: Array<any> = []
  notifications: Array<any> = []
  profile: any = {}
  loggedInProfile: any = {}
  substitutes:any = []
  showAvatar: boolean = true
  profileName: string = ""
  currentProfile:any = {
    name: '',
    nip: ''
  }

  allowToSeePaymentHistory: boolean = true

  dashboard: DashboardContract

  buttons:Array<any> = [
    {
      title: 'Persuratan',
      page: SuratPage.TAG,
      icon: 'm-persuratan.svg',
      enabled: true
    },
    {
      title: 'APT',
      page: AptPage.TAG,
      icon: 'm-apt.svg',
      enabled: true
    },
    {
      title: 'Personal',
      page: PersonalPage.TAG,
      icon: 'm-personal.svg',
      enabled: true
    },
    {
      title: 'E-Rapat',
      page: MeetingListPage.TAG,
      icon: 'm-erapat.svg',
      enabled: true
    }
  ]

  constructor(
    public navCtrl: NavController,
    public userProvider: UserProvider,
    public fcm: FCM,
    private homeProvider: HomeProvider,
    private loaderHelper: LoaderHelper,
    private token: TokenProvider,
    private platform: Platform
  ) {}

  ionViewWillEnter() {
    LogUtil.d(this.TAG, "ionViewWillEnter")
    this.listMenu();
    this.initData();
    this.platform.ready().then(() => {
      this.fcmGetToken();
    });
    if (this.bell) {
        this.bell.updateNotification()
    }
  }

  listMenu() {
    this.menus = MenuHomeConstant.getMenus();
    return this.menus;
  }

  setNotificationTotal(title: any, res: any) {
    if (title === "PERSURATAN") return res.notification_persuratan;

    if (title === "PERSONAL") return res.notification_personal;

    if (title === "APT") return res.notification_apt;
  }

  pagesTo(component:any) {
    if (component !== '' && component.enabled) {
      this.navCtrl.push(component.page);
    }
  }

  logout() {
    this.loaderHelper.createLoader();
    this.userProvider.logout().subscribe(
      () => {
        this.userProvider.purgeAuth();
        this.navCtrl.setRoot("LoginPage");
        this.loaderHelper.dismiss();
      },
      err => {
        this.userProvider.purgeAuth();
        this.loaderHelper.dismiss();
        this.navCtrl.setRoot("LoginPage");
      }
    );
  }

  fcmGetToken() {
    this.fcm.getToken().then(
      token => {
        this.userProvider.saveFcmToken(token).subscribe();
      },
      err => {}
    );
    this.fcm.onTokenRefresh().subscribe(
      token => {
        this.userProvider.saveFcmToken(token).subscribe();
      },
      err => {}
    );
  }

  async initData(force:boolean = false) {
    // get profile dari localStorage jika sudah ada
    this.userProvider.getProfile(force)
    .then(profile => {
      LogUtil.d(this.TAG, "return")
      LogUtil.d(this.TAG, profile)
      if (this.profile) {
        this.currentProfile.name = profile.nama
        this.currentProfile.nip = profile.nip
      }
      return Promise.resolve(profile)
    })
    .then(profile => {
      return Promise.all([this.token.getLoggedInUser(), profile])
    })
    .then(([data, profile]) => {
      if (data && data.user && profile && data.user.name == profile.nip) {
        this.loggedInProfile = profile
        if (profile.user_pengganti) {
          this.substitutes = []
          profile.user_pengganti.forEach(element => {
            this.substitutes.push(element)
          })
        }
      }
    })
    .then(() => {
      return this.getProfilePicture()
    })
    .then(() => {
      return this.getDashboard()
    })
    .catch(error => {
      LogUtil.d(this.TAG, "i catch error here on profile")
      LogUtil.e(this.TAG, error)
      this.redirectToLogIn(error)
    })
  }
  
  private getDashboard(): any {
    if (!this.isCurrentUserEqualsToLoggedInUser()) {
      return this.resetDashboard()
    }
    return this.homeProvider.getDashboard()
    .then(
      res => {
        if (res) {
          LogUtil.d(this.TAG, res)
          this.dashboard = deserialize<Dashboard>(Dashboard, res.response)
        } 
      })
      .catch(error => {
        LogUtil.d(this.TAG, "error accessing API dashboard")
        LogUtil.d(this.TAG, error)
        this.redirectToLogIn(error)
      }
    )
  }

  private getProfilePicture() {
    this.homeProvider.getPhotoProfile()
    .then(
      res => {
        if (res != null) {
          this.image.nativeElement.src = URL.createObjectURL(res)
          this.showAvatar = false
        } else {
          this.showAvatar = true
        }
      }
    ).catch(error => {
      this.showAvatar = true
      this.redirectToLogIn(error)
    })
  }

  triggerOpenSelect() {
    if (this.select) {
      LogUtil.d(this.TAG, "not null")
      this.select.open()
    } else {
      LogUtil.d(this.TAG, "probably null")
    }
  }

  //  by pass plt/plh
  byPass(nip: string) {
    //cek apakah nip yg di select, sama dengan currentUser
    if (nip == this.loggedInProfile.nip) {
      //jika ada, ubah token kembali dengan user asli/bukan plt -plh nya
      this.token.setCurrentUserDataFirst()
      .then(() => {
        this.initData()
        this.enabledPaymentHistory()
      }).catch(error => {
        this.redirectToLogIn(error)
      })
    } else {
      this.loaderHelper.createLoader()
      this.userProvider.byPass(nip)
      .subscribe(
        res => {
          LogUtil.d(this.TAG, res)
          this.disabledPaymentHistory()
          if (res) {
            this.initData(true)
            this.bell.updateNotification()
          }
          this.loaderHelper.dismiss()
        },
        err => {
          this.loaderHelper.dismiss()
        }
      );
    }
  }

  getNotificationType(): string {
    return NotificationProvider.TYPE_ALL
  }

  getSubstituteUsers() {
    return this.substitutes
  }

  private redirectToLogIn(error): void {
    LogUtil.e(this.TAG, error)
    if (error.message.includes(ERROR_CODES.MISSING_TOKEN)) {
      this.userProvider.purgeAuth();
      this.navCtrl.setRoot("LoginPage");
    }
  }

  historyPage() {
    this.navCtrl.push(PaymentHistoryPage.TAG)
  }

  private resetDashboard(): boolean {
    const notices = this.dashboard.getNotices()
    this.dashboard = new Dashboard()
    this.dashboard.setNotices(notices)
    return true
  }

  private isCurrentUserEqualsToLoggedInUser(): boolean {
    return this.loggedInProfile.nip == this.currentProfile.nip
  }

  isAllowToSeePaymentHistory(): boolean {
    return this.allowToSeePaymentHistory
  }

  private disabledPaymentHistory(): void {
    this.allowToSeePaymentHistory = false
  }

  private enabledPaymentHistory(): void {
    this.allowToSeePaymentHistory = true
  }

}
