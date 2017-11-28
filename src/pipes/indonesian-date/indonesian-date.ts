import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";
@Pipe({
  name: "indonesianDate"
})
export class IndonesianDatePipe implements PipeTransform {
  /**
   * Takes a value timestamps and convert to locale indonesian date.
   */
  transform(
    value: number,
    args = "dddd, DD MMMM YYYY H:m:s",
    parse = "DD-MM-YYYY"
  ) {
    const newDate = moment(value, parse)
      .locale("ID_id")
      .format(args);

    return newDate;
  }
}
