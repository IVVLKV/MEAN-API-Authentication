import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthenticationService } from './authentication.service'
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../_custom_modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthCookieHandlerService } from './auth-cookie-handler.service';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthenticationService,
    AuthCookieHandlerService
  ]
})
export class AuthenticationModule { }
