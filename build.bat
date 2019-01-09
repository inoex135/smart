echo off
title Build release
echo remove older unsigned apk
del ./platforms/android/build/outputs/apk/android-release-unsigned.apk
echo remove older signed apk
del .\smart.apk
echo build release
ionic cordova build android --release --verbose