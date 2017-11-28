import { Injectable } from "@angular/core";
import { ApiProvider } from "../api/api";

@Injectable()
export class MasterProvider {
  constructor(private api: ApiProvider) {}
}
