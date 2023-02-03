import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {

  constructor(private router: Router){}
  redirect(buttonNum: number): void {
    if (buttonNum === 1) {
      this.router.navigate(['profile/info'])
    } else if (buttonNum === 2) {
      this.router.navigate(['profile/history'])
    } else if (buttonNum === 3) {
      this.router.navigate(['profile/favorites'])
    }
  }
}
