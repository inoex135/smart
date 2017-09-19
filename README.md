## SMART Mobile with Ionic 3
### Installation

*Ionic memerlukan nodejs dan npm/yarn. jika belum install, bisa instal terlebih dahulu*

Untuk menjalankan project :
1. Clone repo.
2. Run command for install packages with `yarn` or `npm install`. you must install yarn first if use yarn.
3. Setup your `API URL` in `src/config/environtment.ts`.
4. Run `npm install -g ionic cordova` to install ionic command and cordova.
5. Then, run `ionic serve` for development in browser.
6. Or development with emulator, install android studio in your local pc.
7. run command `ionic cordova emulate android`.

### Development
* Untuk development, biasakan menggunakan generate bawaan ionic. lebih lengkapnya disini [https://ionicframework.com/docs/cli/generate/](https://ionicframework.com/docs/cli/generate/)

* Install Android Studio, Java JDK ketika akan build ke android.

## Production
1. Pertama, tambahkan target platform yang diinginkan dengan command `ionic cordova platform add android`
2. Jika platform sudah pernah ditambahkan, bisa langsung jalankan command ini untuk build menjadi APK `ionic cordova build android --prod`.
3. Atau juga ketika akan sudah rilis bisa tambahkan ` --release` di step nomor 2.

## Template
* For documentation about template, [here](http://csform.com/documentation-for-ionic-3-ui-template-app-blue-light/#login-page)

* [Versi Video] (https://www.youtube.com/watch?v=FMR1BgGYbIE&list=PLQUKcFIakdPZ6cETZo3NRCvikLxZENH9G)

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

## Reference
* [https://ionicframework.com/docs](https://ionicframework.com/docs)
* [https://github.com/shumbo/ionic-realworld-example-app](https://github.com/shumbo/ionic-realworld-example-app)
* [https://www.joshmorony.com/adding-responsive-charts-graphs-to-ionic-2-applications/](https://www.joshmorony.com/adding-responsive-charts-graphs-to-ionic-2-applications/)
