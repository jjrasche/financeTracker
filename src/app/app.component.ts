import { Component } from "@angular/core";
import * as crypto from "crypto-js";
import { hashedPassword } from "./hashedPassword";
import { encryptedData } from "./data";
import { FinanceObject } from "./finance-object";
import { FinanceData } from "./finance-data";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "app";
  public loginVerified: boolean;
  public dataSet: Array<FinanceObject>;

  public constructor() {
    this.loginVerified = false;
    this.dataSet = new Array<FinanceObject>();
  }

  private initializeData(encryptionKey: string) {
    let bytes = crypto.AES.decrypt(encryptedData, encryptionKey);
    let plaintext = bytes.toString(crypto.enc.Utf8);
    let obj = JSON.parse(plaintext) as Array<FinanceObject>;
    this.dataSet = obj;
  }

  public verifyPassword(input: string) {
    if (hashedPassword === crypto.enc.Base64.stringify(crypto.SHA1(input))) {
      this.loginVerified = true;
      this.initializeData(input);
    }
  }

}
