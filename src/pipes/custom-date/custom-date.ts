import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";
/**
 * Generated class for the CustomDatePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: "customDate"
})
export class CustomDatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: Array<any>, ...args) {
    if (value) {
      return moment(value[2] + "-" + value[1] + "-" + value[0], "DD-MM-YYYY")
        .locale("ID_id")
        .format("DD MMMM YYYY");
    }
  }
}
