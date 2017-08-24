import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

@Injectable()
export class TokenProvider {
  public latestToken: String;

  constructor(public storage: Storage) { }

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
