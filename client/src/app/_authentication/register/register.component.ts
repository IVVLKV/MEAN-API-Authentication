import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup ({
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  register() {
    this.authenticationService.register(this.registerForm.value)
  }

}
