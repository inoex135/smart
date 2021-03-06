import { IonicPage, Select, Slides, NavController, Platform } from "ionic-angular";
import { Component, ViewChild, ElementRef } from "@angular/core";
import { NotificationBell } from "../../components/notification-bell/notification-bell";
import { Dashboard } from "./models/dashboard";
import { SuratPage } from "../surat/surat";
import { AptPage } from "../apt/apt";
import { PersonalPage } from "../personal/personal";
import { MeetingListPage } from "../meeting-list/meeting-list";
import { UserProvider } from "../../providers/user/user";
import { FCM } from "@ionic-native/fcm";
import { HomeProvider } from "../../providers/home/home";
import { LoaderHelper } from "../../helpers/loader-helper";
import { LogUtil } from "../../utils/logutil";
import { MenuHomeConstant } from "../../constant/menu-home";
import { NotificationProvider } from "../../providers/notification/notification";
import { PaymentHistoryPage } from "../payment-history/payment-history";
import { Serializer } from "serializer.ts/Serializer";
import { BasePage } from "../base-page/base-page";
import { ToastHelper } from "../../helpers/toast-helper";
import { LoginPage } from "../login/login";
import { InAppBrowser } from "@ionic-native/in-app-browser";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage extends BasePage {

  static TAG:string = 'HomePage'

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

  dashboard: Dashboard

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
      enabled: false
    }
  ]

  constructor(
    public navCtrl: NavController,
    public userProvider: UserProvider,
    public toast: ToastHelper,
    public fcm: FCM,
    private homeProvider: HomeProvider,
    private loaderHelper: LoaderHelper,
    private platform: Platform,
    private serializer: Serializer,
    private inAppBrowser: InAppBrowser
  ) {
    super(navCtrl, userProvider, toast)
  }

  ionViewWillEnter() {
    LogUtil.d(HomePage.TAG, "ionViewWillEnter")
    this.listMenu();
    this.initData();
    this.platform.ready()
    .then(() => {
      this.fcmGetToken();
    });
    this.updateNotification()
  }

  private listMenu() {
    this.menus = MenuHomeConstant.getMenus();
    return this.menus;
  }

  private setNotificationTotal(title: any, res: any) {
    if (title === "PERSURATAN") return res.notification_persuratan;

    if (title === "PERSONAL") return res.notification_personal;

    if (title === "APT") return res.notification_apt;
  }

  pagesTo(component:any) {
    if (component !== '' && component.enabled) {
      this.navCtrl.push(component.page);
    }
  }

  private logout() {
    this.loaderHelper.createLoader()
    this.userProvider.logout().subscribe(
      () => {
        this.userProvider.purgeAuth()
        this.navCtrl.setRoot(LoginPage.TAG)
        this.loaderHelper.dismiss()
      },
      err => {
        this.userProvider.purgeAuth()
        this.loaderHelper.dismiss()
        this.navCtrl.setRoot(LoginPage.TAG)
      }
    );
  }

  private fcmGetToken() {
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

  private initData(force:boolean = false) {
    // get profile dari localStorage jika sudah ada
    this.userProvider.getProfile(force)
    .then(profile => {
      LogUtil.d(HomePage.TAG, "return")
      LogUtil.d(HomePage.TAG, profile)
      if (this.profile) {
        this.currentProfile.name = profile.nama
        this.currentProfile.nip = profile.nip
      }
      LogUtil.d(HomePage.TAG, this.currentProfile)
      return Promise.resolve(profile)
    })
    .then(profile => {
      return Promise.all([this.userProvider.getLoggedInUser(), profile])
    })
    .then(([data, profile]) => {
      if (data && data.user && profile && profile.nip && data.user.name == profile.nip) {
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
      return Promise.all([this.getDashboard(), this.getProfilePicture()]) 
    })
    .catch(error => {
      LogUtil.d(HomePage.TAG, "i catch error here on profile")
      this.redirectToLogIn(error)
    })
  }

  private openNotice(notice: any): void {
    LogUtil.d(HomePage.TAG, notice)
    window.open(notice.url, '_system')
  }
  
  private getDashboard(): any {
    if (!this.isCurrentUserEqualsToLoggedInUser()) {
      return this.resetDashboard()
    }
    return this.homeProvider.getDashboard()
    .then(
      res => {
        if (res) {
          LogUtil.d(HomePage.TAG, res)
          this.dashboard = this.serializer.deserialize<Dashboard>(Dashboard, res)
        } 
    })
  }

  private getProfilePicture() {
    return this.homeProvider.getPhotoProfile()
    .then(
      res => {
        if (res != null) {
          this.image.nativeElement.src = URL.createObjectURL(res)
          this.showAvatar = false
        } else {
          this.showAvatar = true
        }
        return Promise.resolve(res)
      }
    ).catch(error => {
      LogUtil.e(HomePage.TAG, error)
      return Promise.resolve(true)
    })
  }

  private triggerOpenSelect() {
    if (this.select) {
      LogUtil.d(HomePage.TAG, "not null")
      this.select.open()
    } else {
      LogUtil.d(HomePage.TAG, "probably null")
    }
  }

  //  by pass plt/plh
  private byPass(nip: string) {
    //cek apakah nip yg di select, sama dengan currentUser
    if (nip == this.loggedInProfile.nip) {
      //jika ada, ubah token kembali dengan user asli/bukan plt -plh nya
      this.userProvider.setCurrentUserData()
      .then(() => {
        this.initData()
        this.enabledPaymentHistory()
      }).catch(error => {
        this.redirectToLogIn(error)
      })
    } else {
      this.loaderHelper.show()
      .then(() => {
        this.userProvider.byPass(nip)
        .subscribe(
          res => {
            LogUtil.d(HomePage.TAG, res)
            this.disabledPaymentHistory()
            if (res) {
              this.initData(true)
              this.updateNotification()
            }
            this.loaderHelper.dismissLoader()
          },
          err => {
            this.loaderHelper.dismissLoader()
            this.redirectToLogIn(err)
          }
        )
      })
    }
  }

  private updateNotification(): void {
    if (this.bell) {
      this.bell.updateNotification(exception => this.redirectToLogIn(exception))
    }
  }

  private getNotificationType(): string {
    return NotificationProvider.TYPE_ALL
  }

  private getSubstituteUsers() {
    return this.substitutes
  }

  private historyPage() {
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

  private isAllowToSeePaymentHistory(): boolean {
    return this.allowToSeePaymentHistory
  }

  private disabledPaymentHistory(): void {
    this.allowToSeePaymentHistory = false
  }

  private enabledPaymentHistory(): void {
    this.allowToSeePaymentHistory = true
  }

  private openBrowser(notice) {
    LogUtil.d(HomePage.TAG, 'open link: ' + notice.url)
    if (this.platform.is('android') || this.platform.is('ios')) {
      LogUtil.d(HomePage.TAG, "it's mobile so use inAppBrowser")
      this.inAppBrowser.create(notice.url)
    } else {
      LogUtil.d(HomePage.TAG, 'other system or browser')
      window.open(notice.url, '_system')
    }
  }

}
