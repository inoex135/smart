import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Injectable()
export class TokenProvider {
  public latestToken: string;
  public latestUser: any;

  constructor(public storage: Storage) {}

  getToken(): Promise<String> {
    return this.storage
      .ready()
      .then(() => this.storage.get("token") as Promise<string>)
      .then(token => {
        this.latestToken = token;
        return token;
      });
  }

  getUser(): Promise<Object> {
    return this.storage
      .ready()
      .then(() => this.storage.get("user") as Promise<Object>)
      .then(user => {
        this.latestUser = user;
        return user;
      });
  }

  saveToken(token: string): Promise<void> {
    this.latestToken = token;
    return this.storage
      .ready()
      .then(() => this.storage.set("token", token) as Promise<void>);
  }

  saveUser(user: any): Promise<void> {
    this.latestUser = user;
    return this.storage
      .ready()
      .then(() => this.storage.set("user", user) as Promise<void>);
  }

  destroyToken() {
    this.latestToken = null;
    return this.storage.remove("token");
  }

  destroyUser() {
    this.latestUser = null;
    return this.storage.remove("user");
  }

  destroy() {
    this.destroyToken();
    this.destroyUser();
  }
}
