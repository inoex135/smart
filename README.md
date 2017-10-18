## SMART Mobile with Ionic 3

### Required
* Ionic memerlukan nodejs dan npm/yarn. jika belum install, bisa instal terlebih dahulu
* Usahakan android studio sudah terinstall dan bisa digunakan untuk build untuk development.

### Installation
Untuk menjalankan project :

1. Clone repo.
2. Run command for install packages with `yarn` or `npm install`. you must install yarn first if use yarn.
3. Setup your `API URL` in `src/config/environtment.ts`.
4. Run `npm install -g ionic cordova` to install ionic command and cordova.
5. Then, run `ionic serve` for development in browser.
6. Atau jika ingin develop di android lewat emulator, run `ionic cordova build android --prod -l`.
7. untuk build debug bisa jalankan command `ionic cordova platform add android` jika belum ada platform.
9. jalankan command utk build menjadi apk `ionic cordova build android --prod`.
10. lalu hasilnya bisa di lihat di folder `platform/android/build/outputs/apk`

## Production
1. Pertama, tambahkan target platform yang diinginkan dengan command `ionic cordova platform add android`
2. Jika platform sudah pernah ditambahkan, bisa langsung jalankan command ini untuk build menjadi APK `ionic cordova build android --prod`.
3. Atau juga ketika akan sudah rilis bisa tambahkan ` --release` di step nomor 2.

## Template
* For documentation about template [here](http://csform.com/documentation-for-ionic-3-ui-template-app-blue-light/#login-page) dan [Video](https://www.youtube.com/watch?v=FMR1BgGYbIE&list=PLQUKcFIakdPZ6cETZo3NRCvikLxZENH9G)

## Debugging Tips
* Untuk debug network di device android, bisa mengikuti cara ini:
https://stackoverflow.com/questions/32832135/how-to-use-chrome-remote-debugging-with-ionic-framework

## Common Error
* Jika run command `ionic serve` muncul module not found, bisa install ulang ionic-cli dengan command:
```
npm install -g ionic
```

* Jika muncul `Failed to find ANDROID_HOME environment variable` coba baca2 disini :
 [https://stackoverflow.com/questions/26356360/error-android-home-is-not-set-and-android-command-not-in-your-path-you-must](https://stackoverflow.com/questions/26356359/error-android-home-is-not-set-and-android-command-not-in-your-path-you-must)

* Error ketika build menjadi apka` The Task.leftShift(Closure) method has been deprecated  [disini](https://stackoverflow.com/questions/31310182/error-could-not-find-gradle-wrapper-within-android-sdk-might-need-to-update-yo/41177145#41177145)


### Etc
```
cli packages:

    @ionic/cli-utils  : 1.12.0
    ionic (Ionic CLI) : 3.12.0

global packages:
    cordova (Cordova CLI) : 7.1.0

local packages:
    @ionic/app-scripts : 3.0.0
    Cordova Platforms  : android 6.2.1
    Ionic Framework    : ionic-angular 3.7.0

System:
    Android SDK Tools : 26.0.2
    Node              : v6.11.3
    npm               : 3.10.10
    OS                : Windows 10

Misc:
    backend : legacy
```

## Reference
* [https://ionicframework.com/docs](https://ionicframework.com/docs)
* [https://github.com/shumbo/ionic-realworld-example-app](https://github.com/shumbo/ionic-realworld-example-app)
* [https://www.joshmorony.com/adding-responsive-charts-graphs-to-ionic-2-applications/](https://www.joshmorony.com/adding-responsive-charts-graphs-to-ionic-2-applications/)
* [https://github.com/mumairofficial/text-avatar#how-to-use] (https://github.com/mumairofficial/text-avatar#how-to-use)
* [http://www.chartjs.org/](http://www.chartjs.org/)
