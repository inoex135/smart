import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController, Platform, IonicPage, Select } from "ionic-angular";
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

  dashboard:any = {
    "CT": 0,
    "jam_masuk_hari_ini": "-",
    "DL": 0,
    "hari_kerja": 0,
    "akumulasi_absen": "-",
    "jumlah_hari_masuk": 0,
    "jam_keluar_hari_ini": null
  }

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

  pagesTo(component: string) {
    if (component !== '') {
      this.navCtrl.push(component);
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

  private getDashboard() {
    this.homeProvider.getDashboard().then(
      res => {
        if (res) {
          LogUtil.d(this.TAG, res)
          this.dashboard = res.response
        } 
      })
      .catch(error => {
        LogUtil.d(this.TAG, "error accessing API dashboard")
        LogUtil.d(this.TAG, error)
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

  getPresensi(): string {
    if (this.dashboard 
      && this.dashboard.jumlah_hari_masuk > 0
      && this.dashboard.hari_kerja > 0
    ) {
      let percent = (this.dashboard.jumlah_hari_masuk / this.dashboard.hari_kerja) * 100
      return percent.toFixed(0) + "%"
    }
    return "-"
  }

  //  by pass plt/plh
  byPass(nip: string) {
    //cek apakah nip yg di select, sama dengan currentUser
    if (nip == this.loggedInProfile.nip) {
      //jika ada, ubah token kembali dengan user asli/bukan plt -plh nya
      this.token.setCurrentUserDataFirst()
      .then(() => {
        this.initData()
      }).catch(error => {
        this.redirectToLogIn(error)
      })
    } else {
      this.loaderHelper.createLoader();
      this.userProvider.byPass(nip)
      .subscribe(
        res => {
          LogUtil.d(this.TAG, res)
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

  getNotificationType():string {
    return NotificationProvider.TYPE_ALL
  }

  getSubstituteUsers() {
    return this.substitutes
  }

  private redirectToLogIn(error):void {
    LogUtil.e(this.TAG, error)
    if (error.message.includes(ERROR_CODES.MISSING_TOKEN)) {
      this.userProvider.purgeAuth();
      this.navCtrl.setRoot("LoginPage");
    }
  }

}
