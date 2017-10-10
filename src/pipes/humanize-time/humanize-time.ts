import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
  name: "humanizeTime"
})
export class HumanizeTimePipe implements PipeTransform {
  /**
   * Takes a value and makes it human readable times
   */
  transform(value: string, ...args) {
    const start = moment(value);
    const end = moment(); //now

    let differentTime = end.diff(start, "days");

    return moment.duration(differentTime, "days").humanize();
  }
}
