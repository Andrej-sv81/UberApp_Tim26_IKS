
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenService } from '../token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  hasError: boolean = false;
  constructor(private router: Router,
              private authService: AuthService,
              private tokenService: TokenService){}

  login(){
    const login = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    }

    if (this.loginForm.valid) {
      this.authService.login(login).subscribe({
        next: (result) => {
          console.log(result);
          this.tokenService.saveUser(result);
          this.tokenService.saveToken(result.accessToken);
          this.tokenService.saveRefreshToken(result.refreshToken);
          //this.authService.setUser();
          this.router.navigate(['home']);
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            this.hasError = true;
          }
        },
      });
    }
  }

}
