import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { User } from "../../models/users";

@Injectable()
export class TokenProvider {
  public latestToken: string;
  public latestUser: any;
  public latestProfile: any;

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

  getProfile(): Promise<Object> {
    return this.storage
      .ready()
      .then(() => this.storage.get("profile") as Promise<Object>)
      .then(profile => {
        this.latestProfile = profile;
        return profile;
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

  saveProfile(profile: any): Promise<void> {
    this.latestProfile = profile;

    return this.storage
      .ready()
      .then(() => this.storage.set("profile", profile) as Promise<void>);
  }

  destroyToken() {
    this.latestToken = null;
    return this.storage.remove("token");
  }

  destroyProfile() {
    this.latestProfile = null;
    return this.storage.remove("profile");
  }

  destroyUser() {
    this.latestUser = null;
    return this.storage.remove("user");
  }

  destroy() {
    this.destroyToken();
    this.destroyUser();
    this.destroyProfile();
  }
}
