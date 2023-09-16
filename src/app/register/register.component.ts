import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userData = {
    Name: '',
    Email: '',
    Password: '',
    Number: ''
  };

  constructor(private http: HttpClient) { // Add 'private' access modifier here
  }

  onSubmit(event) {
    event.preventDefault();

    // Replace 'http://localhost:3000' with the actual URL of your Node.js API
    const apiUrl = 'http://localhost:3001/api/register';

    // Send the registration data to your backend API
    this.http.post(apiUrl, this.userData).subscribe(
      (response) => {
        // Handle the response from the server (e.g., success message)
        console.log('Registration successful:', response);
      },
      (error) => {
        // Handle any errors that occur during the request
        console.error('Error registering user:', error);
      }
    );
  }

  ngOnInit(): void {
  }
}
