echo off
echo remove older apk
del .\smart.apk
echo signing apk
jarsigner -verbose -sigalg SHA1withRSA -storepass Integrasi54 -digestalg SHA1 -keystore ../keys/my-release-key.keystore ./platforms/android/build/outputs/apk/android-release-unsigned.apk DJKN 
echo zip allign
zipalign -v 4 ./platforms/android/build/outputs/apk/android-release-unsigned.apk smart.apk
