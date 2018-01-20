import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AES } from 'crypto-js';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
