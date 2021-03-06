import { ENV } from "../config/environment";
import { Injectable } from "@angular/core";

@Injectable()
export class LogUtil {

    private static PACKAGE: string = 'com.smart.djkn'

    private static printDebug = (TAG:string, message:string) => {
        console.log(LogUtil.basicFormat() + " - DEBUG - " + TAG + " - " + message)
        return 1
    }

    private static basicFormat(): string {
        return LogUtil.PACKAGE + ' [' + new Date().toISOString() + ']'
    }

    public static d(TAG:string, object: any) {
        if (ENV.DEV) {
            if (object instanceof String) {
                return this.printDebug(TAG, object.toString())
            } else {
                return this.printDebug(TAG, JSON.stringify(object))
            }
        }
    }

    public static e(TAG:string, error) {
        if (ENV.DEV) {
            console.error(LogUtil.basicFormat() + ' - ERROR - ' + TAG + " - message: " + error.message, error)
        }
    }

}