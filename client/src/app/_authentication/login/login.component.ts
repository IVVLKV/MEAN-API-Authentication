import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup ({
    email: new FormControl(),
    password: new FormControl()
  });

  loading: boolean = false;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    if(this.authenticationService.getUsername()) {
      this.authenticationService.logout()
    } 
  }

  login() {
      this.loading = true;
      this.authenticationService.login(this.loginForm.value)
  }

  loadingProgress() {
      return this.loading;
  }

  

}
