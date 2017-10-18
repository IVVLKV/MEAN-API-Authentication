import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userData = {}

  loginForm = new FormGroup ({
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authenticationService.login(this.loginForm.value)
      .subscribe(
        data => {
          if (data) {
              localStorage.setItem('currentUser', JSON.stringify(data));
              console.log('Success:' + JSON.stringify(data))
              this.router.navigate(['/home']);
          }
        },
        error => {
          console.log(error)
        });
  }

}
