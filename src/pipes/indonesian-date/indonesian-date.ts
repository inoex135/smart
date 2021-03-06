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
    if (value) {
      const newDate = moment(value)
        .locale("ID_id")
        .format(args);

      return newDate;
    }

    return;
  }
}
