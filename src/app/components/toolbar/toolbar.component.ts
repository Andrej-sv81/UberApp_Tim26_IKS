import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../modules/auth/auth.service';
import { TokenService } from 'src/app/modules/auth/token/token.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  constructor(private auth: AuthService){}
  public logged!: boolean;
  ngOnInit(): void {
    this.logged = this.auth.isLoggedIn();
  }

}
