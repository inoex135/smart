echo off
title Build release
echo remove older unsigned apk
del .\platforms\android\build\outputs\apk\android-release-unsigned.apk
echo remove older signed apk
del .\smart.apk
echo disabled log developement
powershell "(Get-Content .\src\config\environment.ts) -replace '(DEV:)\s(true|false)', 'DEV: false' | Out-File -encoding UTF8 .\src\config\environment.ts"
echo build release
call ionic cordova build android --release --verbose
echo remove older apk
del .\smart.apk
echo signing apk
call jarsigner -verbose -sigalg SHA1withRSA -storepass Integrasi54 -digestalg SHA1 -keystore ../keys/my-release-key.keystore ./platforms/android/build/outputs/apk/android-release-unsigned.apk DJKN 
echo zip allign
call zipalign -v 4 ./platforms/android/build/outputs/apk/android-release-unsigned.apk smart.apk
