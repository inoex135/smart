import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";
@Pipe({
  name: "indonesianDate"
})
export class IndonesianDatePipe implements PipeTransform {
  /**
   * Takes a value timestamps and convert to locale indonesian date.
   */
  transform(value: number, ...args) {
    const newDate = moment
      .unix(1318781876)
      .locale("ID_id")
      .format("dddd, DD MMMM YYYY H:m:s");
    return newDate;
  }
}
