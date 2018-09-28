## SMART Mobile with Ionic 3

### Required

* Ionic memerlukan nodejs 6.11.4(pada saat ini) dan npm/yarn. jika belum
  install, bisa instal terlebih dahulu
* Install ionic dan cordova `npm i -g ionic cordova`.
* Usahakan android studio sudah terinstall dan bisa digunakan untuk build untuk
  development.

### Development

Untuk menjalankan project :

1. Clone repo.
2. Install packages with `yarn` or `npm install`.
3. Setup your `API URL` in `src/config/environtment.ts`.
4. Then, run `ionic serve` for development in browser.
5. Jika ingin jalankan di emulator atau build pastikan platform sudah tersedia
   atau jalankan command `ionic cordova platform add android`.
6. Run in emulator `ionic cordova run android`
7. jalankan command utk build menjadi apk `ionic cordova build android --prod`.
8. lalu hasilnya bisa di lihat di folder `platform/android/build/outputs/apk`.

## Production

1. Pastikan Env.DEV bernilai false.
2. Pertama, tambahkan target platform yang diinginkan dengan command `ionic cordova platform add android`
3. ketika akan sudah rilis bisa tambahkan command `ionic cordova build android --prod --release`.
4. Atau bisa juga mengikuti cara ini [https://ionicframework.com/docs/v1/guide/publishing.html](https://ionicframework.com/docs/v1/guide/publishing.html)
5. Bisa juga untuk signed apk menggunakan android studio. yaitu build terlebih dahulu menggunakan step 2, lalu klik tab build lalu pilih `generate signed apk`.
6. kemudian isi form dengan keystore yang sudah dibuat.

* keystore dan passwordnya ada disini https://collab.javan.co.id/projects/138/notes?modal=Note-119-138-0

## Template

* For documentation about template
  [here](http://csform.com/documentation-for-ionic-3-ui-template-app-blue-light/#login-page)
  dan
  [Video](https://www.youtube.com/watch?v=FMR1BgGYbIE&list=PLQUKcFIakdPZ6cETZo3NRCvikLxZENH9G)

## Debugging Tips

* Untuk debug network di device android, bisa mengikuti cara ini:
  https://stackoverflow.com/questions/32832135/how-to-use-chrome-remote-debugging-with-ionic-framework

## Common Error

* Jika run command `ionic serve` muncul module not found, bisa install ulang
  ionic-cli dengan command:

```
npm install -g ionic
```

* Jika muncul `Failed to find ANDROID_HOME environment variable` coba baca2
  disini :
  [https://stackoverflow.com/questions/26356360/error-android-home-is-not-set-and-android-command-not-in-your-path-you-must](https://stackoverflow.com/questions/26356359/error-android-home-is-not-set-and-android-command-not-in-your-path-you-must)

* Error ketika build menjadi apka` The Task.leftShift(Closure) method has been
  deprecated
  [disini](https://stackoverflow.com/questions/31310182/error-could-not-find-gradle-wrapper-within-android-sdk-might-need-to-update-yo/41177145#41177145)

* Jika error build setelah menambahkan plugin cordova, Cara fixnya hapus folder
  `/platform` dan `/plugin`, kemudian tambahkan platform lagi dengan command
  `ionic cordova platform add android`, baru jalankan ulang buildnya.

## Server

* Server production DJKN: https://www.djkn.kemenkeu.go.id/smart.service/api
* Server development JAVAN: http://api.smart.javan.co.id/api

### Etc

```
cli packages:

    @ionic/cli-utils  : 1.19.0
    ionic (Ionic CLI) : 3.19.0

global packages:
    cordova (Cordova CLI) : 7.1.0

local packages:
    @ionic/app-scripts : 3.1.2
    Cordova Platforms  : android 6.3.0
    Ionic Framework    : ionic-angular 3.9.0

System:
    Android SDK Tools : 26.1.1
    Node              : v8.9.1
    npm               : 5.5.1
    OS                : Linux 4.9

Misc:
    backend : legacy
```

## Note

* You can downgrade to your old version by running: npm i --save -E ionic@3.16.0

## Reference

* [https://ionicframework.com/docs/v1/guide/publishing.html](https://ionicframework.com/docs/v1/guide/publishing.html)
* [https://ionicframework.com/docs](https://ionicframework.com/docs)
* [https://github.com/shumbo/ionic-realworld-example-app](https://github.com/shumbo/ionic-realworld-example-app)
* [https://www.joshmorony.com/adding-responsive-charts-graphs-to-ionic-2-applications/](https://www.joshmorony.com/adding-responsive-charts-graphs-to-ionic-2-applications/)
* [https://github.com/mumairofficial/text-avatar#how-to-use](https://github.com/mumairofficial/text-avatar#how-to-use)
* [http://www.chartjs.org/](http://www.chartjs.org/)
