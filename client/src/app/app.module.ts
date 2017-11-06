import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './_custom_modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AuthenticationModule } from './_authentication/authentication.module';
import { appRouting } from './app.routes';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth-guard.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './_authentication/auth-interceptor.service';
import { HeaderComponent } from './header/header.component'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    appRouting,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
