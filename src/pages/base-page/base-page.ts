import { LogUtil } from "../../utils/logutil";
import { UserProvider } from "../../providers/user/user";
import { NavController } from "ionic-angular";
import { ToastHelper } from "../../helpers/toast-helper";

export class BasePage {

    TAG: string = 'BasePage'

    constructor(public navCtrl: NavController,
        public userProvider: UserProvider,
        public toast: ToastHelper
    ) {
        LogUtil.d(this.TAG, 'init base page.')
    }

    protected redirectToLogIn(error): void {
        LogUtil.d(this.TAG, 'redirect to login page!')
        LogUtil.e(this.TAG, error)
        if ((error.status && error.status === 401)) {
          this.userProvider.purgeAuth()
          this.navCtrl.setRoot("LoginPage")
        }
    }

    protected catchStatusCode(error): void {
        this.toast.presentError(error)
    }

}