import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  showLogin: boolean = true; // Initially show the login form

  toggleForm(): void {
    this.showLogin = !this.showLogin; // Toggle between login and register forms
  }

  // Handle successful login
  onLoginSuccess(): void {
    this.showLogin = false; // Set to false after successful login
  }
}
