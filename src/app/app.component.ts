import { Component } from "@angular/core";
import * as crypto from "crypto-js";
import { hashedPassword } from "./hashedPassword";
import { encryptedData, unencryptedData } from "./data";
import { FinanceObject } from "./objects/finance/object/finance-object";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "app";
  public loginVerified: boolean;
  public dataSet: Array<FinanceObject>;
  public hashBoxOpened: boolean;
  public hashedOutput: string;
  private encryptionKey: string;

  public constructor() {
    this.loginVerified = false;
    this.dataSet = new Array<FinanceObject>();
    this.hashBoxOpened = false;
    this.initializeData("");
    this.loginVerified = true;
  }
 
  private initializeData(encryptionKey: string) {
    // this.encryptionKey = encryptionKey;
    // let unencryptedData = this.decryptAES(encryptedData, encryptionKey);
    var ud = unencryptedData;
    let obj = JSON.parse(unencryptedData) as Array<FinanceObject>;
    this.dataSet = obj;
  }

  public hashHelper(input: string) {
    this.hashedOutput = this.encryptAES(input, this.encryptionKey);
  }

  private decryptAES(encryptedData: string, encryptionKey: string) {
    let bytes = crypto.AES.decrypt(encryptedData, encryptionKey);
    return bytes.toString(crypto.enc.Utf8);
  }

  private encryptAES(unEncryptedData: string, encryptionKey: string) {
    let bytes = crypto.AES.encrypt(unEncryptedData, encryptionKey);
    return bytes.toString();
  }

  public verifyPassword(input: string) {
    if (hashedPassword === crypto.enc.Base64.stringify(crypto.SHA1(input))) {
      this.loginVerified = true;
      this.initializeData(input);
    }
  }

}

