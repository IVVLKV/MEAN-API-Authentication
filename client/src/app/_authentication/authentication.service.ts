import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {

  options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
  };

  constructor(private http: HttpClient) { }
  
    login(formValue) {
        return this.http.post('http://localhost:3000/auth/login', formValue, this.options)
    }

    logout() {
        localStorage.removeItem('currentUser');
    }

}
