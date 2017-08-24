import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from "@ionic/storage";

@Injectable()
export class TokenProvider {
  constructor(public storage: Storage) { }
  public latestToken: String;

  getToken(): Promise<String> {
    return this.storage.ready().then(
      () => this.storage.get("token") as Promise<string>)
      .then(token => {
        this.latestToken = token;
        return token;
      });
  }

  saveToken(token: String): Promise<void> {
    this.latestToken = token;
    return this.storage
      .ready()
      .then(() => this.storage.set("token", token) as Promise<void>);
  }

  destoryToken() {
    this.latestToken = null;
    return this.storage.remove('token');
  }
}
