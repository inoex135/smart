import { ENV } from "../config/environment";

export class LogUtil {

    static printDebug = (TAG:string, message:string) => {
        console.log("DEBUG - " + TAG + " - " + message)
        return 1
    }

    static d(TAG:string, object: any) {
        if (ENV.DEV) {
            if (object instanceof String) {
                return this.printDebug(TAG, object.toString())
            } else {
                return this.printDebug(TAG, JSON.stringify(object))
            }
        }
    }

    static e(TAG:string, error) {
        if (ENV.DEV) {
            console.error(TAG + " - message: " + error.message, error)
        }
    }

}