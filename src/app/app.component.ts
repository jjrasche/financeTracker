import { Component } from '@angular/core';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  private hashedPassword: string;
  private encryptionKey: string;
  public loginVerified: boolean;

  public constructor() {
    this.hashedPassword = "iZCXiEWABOCABvBcSSWHBgOkAQk=";
    this.encryptionKey = null;
    this.loginVerified = false;
  }

  public verifyPassword(input: string) {
    var hash = crypto.SHA1(input);
    var hash_Latin1 = crypto.enc.Latin1.stringify(hash);
    var hash_Base64 = crypto.enc.Base64.stringify(hash);
    console.log({hash_Base64, hash_Latin1, hash});
    if (this.hashedPassword === hash_Base64) {
      this.encryptionKey = input;
      this.loginVerified = true;
    }
  }

}
