import { Injectable } from "@angular/core";
import { DatePicker } from "@ionic-native/date-picker";

@Injectable()
export class DatepickerProvider {
  private options: any = "";

  constructor(private datePicker: DatePicker) {}

  async datePickerData(mode: string) {
    const datePickerData = await this.datePicker.show(
      this.optionsDatePicker(mode)
    );
    return datePickerData;
  }

  optionsDatePicker(mode: string) {
    return (this.options = {
      date: new Date(),
      mode: mode,
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    });
  }
}
