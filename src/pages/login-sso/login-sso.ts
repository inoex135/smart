import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  ToastController,
  IonicPage,
  Platform
} from "ionic-angular";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ENV } from "../../config/environment";
import { LoaderHelper } from "../../helpers/loader-helper";
import { LogUtil } from "../../utils/logutil";
import { UserProvider } from "../../providers/user/user";

@IonicPage()
@Component({
    selector: "page-login-sso",
    templateUrl: "login-sso.html"
  })
export class LoginSso {

    TAG:string = 'LoginSso'

    browser
    requested:boolean = false
    automaticExit: boolean = false;

    constructor(
        public navCtr: NavController, 
        public iab: InAppBrowser,
        public loaderHelper: LoaderHelper,
        public userProvider: UserProvider
    ) {

    }

    ionViewDidLoad() {
        LogUtil.d(this.TAG, 'view did load')
        this.browser = this.iab.create('https://sso.djkn.kemenkeu.go.id/via/sso/remote/login?no_cache=874&redirect_uri=http%3A%2F%2Flayanandjkn.kemenkeu.go.id&client_id=smart_djkn&encoded=true',
        '_blank',
        'location=no,hardwareback=no,zoom=no'
        )
        this.startLoading()
        this.stopLoading()
        this.browser.on('exit')
        .subscribe(
            (event) => {
                LogUtil.d(this.TAG, "back button click")
                this.navCtr.pop()
            },
            err => {
              LogUtil.e(this.TAG, err);
        });
    }

    startLoading() {
        this.browser.on("loadstart")
         .subscribe(
            (event) => {
                LogUtil.d(this.TAG, event)
                LogUtil.d(this.TAG, "show loader")
              //  this.loaderHelper.createLoader()
                this.extractCodeFromUrl(event)
            },
            err => {
              LogUtil.e(this.TAG, err);
        });
    }

    stopLoading() {
        this.browser.on("loadstop")
        .subscribe(
           (event) => {
                LogUtil.d(this.TAG, 'page event loadstop')
                if (ENV.DEV) {
                    this.currentUrlSso()   
                }
                
            },
            err => {
               LogUtil.e(this.TAG, err);
       });
    }

    setValueToForm(index: number, value: string) {
        this.browser.executeScript({ code : "document.getElementsByClassName('form-control')[" + index + "].value = '" + value + "'"}, (param) => {
            LogUtil.d(this.TAG, param)
        })
    }

    getCurrentUrl() {
        return this.browser.executeScript({ code : "document.location.href"})
        .then(results => {
            let currentUrl = results.length > 0 ? results[0] : ""
            LogUtil.d(this.TAG, currentUrl)
            return currentUrl
        })
    }

    currentUrlSso() {
        return this.getCurrentUrl()
        .then(result => {
            if (result.includes('sso.djkn.kemenkeu.go.id')) {
                LogUtil.d(this.TAG, 'this is dev mode and sso page, so it is easier not to type anything')
                this.setValueToForm(0, '198604122007101001')
                this.setValueToForm(1, 'sibewok')
            }
        })
    }

    extractCodeFromUrl(event) {
        if (event != null) {
            let params:{} = this.query(event.url)
            LogUtil.d(this.TAG, params)
            if (params != null && params['code'] != null && !this.requested) {
                LogUtil.d(this.TAG, 'code get the code: ' + params['code'] + " calling api sso")
                this.doLogin(params['code'])
            }
        }
    }

    query(url) {
        var params = {};
        var parser = document.createElement('a');
        parser.href = url;
        var query = parser.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            params[pair[0]] = decodeURIComponent(pair[1]);
        }
        return params;
    };

    doLogin(code: string) {
        this.loaderHelper.createLoader()
        this.requested = true
        this.userProvider.attemptAuthSsoCode(code).subscribe(
            data => {
                this.requested = false
                LogUtil.d(this.TAG, data)
                this.dismissLoader()
                this.browser.close()
                this.navCtr.setRoot("HomePage")
            },
            err => {
                this.requested = false
                this.dismissLoader()
                this.browser.close()
                LogUtil.d(this.TAG, err)
            }
        );
    }

    dismissLoader() {
        LogUtil.d(this.TAG, "dismiss loader")
        this.loaderHelper.dismiss()
    }

}