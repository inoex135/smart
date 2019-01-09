echo off
title Build release
echo remove older unsigned apk
del .\platforms\android\build\outputs\apk\android-release-unsigned.apk
echo remove older signed apk
del .\smart.apk
echo disabled log developement
powershell "(Get-Content .\src\config\environment.ts) -replace '(DEV:)\s(true|false)', 'DEV: false' | Out-File -encoding UTF8 .\src\config\environment.ts"
echo build release
ionic cordova build android --release --verbose