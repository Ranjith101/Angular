import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  showLogin: boolean = true; // Initially show the login form

  toggleForm(): void {
    this.showLogin = !this.showLogin; // Toggle between login and register forms
  }
  constructor() { }

  ngOnInit(): void {
  }

}
