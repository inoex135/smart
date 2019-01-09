echo off
title Build and Install
echo enabled log
powershell "(Get-Content .\src\config\environment.ts) -replace '(DEV:)\s(true|false)', 'DEV: true' | Out-File -encoding UTF8 .\src\config\environment.ts"
echo build ionic android apk
call ionic cordova build android --verbose
::echo remove older apk
::call D:\Android\SDK\platform-tools\adb uninstall com.djkn.smart
echo install to active emulator
call adb install -r .\platforms\android\build\outputs\apk\android-debug.apk
call adb shell am start -n com.djkn.smart/com.djkn.smart.MainActivity
pause
