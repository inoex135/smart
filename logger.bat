echo off
powershell "adb logcat | Select-String -Pattern ':\s[com.smart.djkn](.*)' | foreach {$_.Matches.Value}"