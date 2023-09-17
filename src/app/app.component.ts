import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sql';
  showLogin = true; // Initially, the user is not logged in

  // Function to handle successful login
  onLoginSuccess() {
    this.showLogin = false; // Set to true after successful login
  }
}
