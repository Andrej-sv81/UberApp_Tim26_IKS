
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenService } from '../token/token.service';
import { Login } from '../model/login';
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
  errorMsg: string = "";
  constructor(private router: Router,
              private authService: AuthService,
              private tokenService: TokenService){}

  login(){
    const login: Login = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    if (this.loginForm.valid) {
      this.authService.login(login).subscribe({
        next: (result) => {
          console.log(result);
          this.tokenService.saveUser(result);
          this.tokenService.saveToken(result.accessToken);
          this.tokenService.saveRefreshToken(result.refreshToken);
          if(this.tokenService.getUser().role === "ROLE_PASSENGER"){
            this.router.navigate(['request-ride']);
          }else{
            this.router.navigate(['driver-home']);
          }
          
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            if(error.status === 400){
              this.errorMsg = "Account is not activated or the provided email and password are incorrect!";
            }else if(error.status === 404){
              this.errorMsg = "User does not exist!";
            }
            this.hasError = true;
          }
        },
      });
    }else{
      this.errorMsg = "Email and password fields can't be empty!";
      this.hasError = true;
    }
  }

}
