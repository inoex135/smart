import { ErrorHandler } from "@angular/core";

export class CustomErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(err: any): void {
    console.log(err);
  }
}
