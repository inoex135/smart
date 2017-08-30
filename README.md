## SMART Mobile with Ionic 3
### Installation

*Ionic memerlukan nodejs dan npm/yarn. jika belum install, bisa instal terlebih dahulu*

Untuk menjalankan project : 
1. Clone repo.
2. Run command for install packages with `yarn` or `npm install`. you must install yarn first if use yarn. 
3. Setup your `API URL` in `src/config/environtment.ts`.
4. run `ionic serve` for development in browser.
5. Or development with emulator, install android studio in your local pc.
6. then, run command `ionic cordova emulate android`. 

### Development
* Untuk development, biasakan menggunakan generate bawaan ionic. lebih lengkapnya disini [https://ionicframework.com/docs/cli/generate/](https://ionicframework.com/docs/cli/generate/)

## Production
1. Pertama, tambahkan target platform yang diinginkan dengan command `cordova platform add android`
2. Jika platform sudah pernah ditambahkan, bisa langsung jalankan command `ionic cordova build android --prod`.
3. Atau juga ketika akan sudah rilis bisa tambahkan ` --release` di step nomor 2.


## Debugging Tips
* Untuk debug network di device android, bisa mengikuti cara ini:
https://stackoverflow.com/questions/32832135/how-to-use-chrome-remote-debugging-with-ionic-framework

## Common Error
* Jika run command `ionic serve` muncul module not found, bisa install ulang ionic-cli dengan command:
```
npm install -g ionic
```

## Reference
* [https://ionicframework.com/docs](https://ionicframework.com/docs)
* [https://github.com/shumbo/ionic-realworld-example-app](https://github.com/shumbo/ionic-realworld-example-app)
* [https://www.joshmorony.com/adding-responsive-charts-graphs-to-ionic-2-applications/](https://www.joshmorony.com/adding-responsive-charts-graphs-to-ionic-2-applications/)
