import * as moment from "moment-timezone";
import { Injectable } from "@angular/core";
@Injectable()
export class MomentHelper {
  convertIsoTo(value: any, to: string) {
    return moment(value, moment.ISO_8601).format(to);
  }
}
