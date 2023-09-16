import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup; // Create a FormGroup

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email').value;
      const password = this.loginForm.get('password').value;

      // Define the login data to send to the API
      const loginData = {
        Email: email,
        Password: password,
      };

      this.http.post<any>('http://localhost:3001/api/login', loginData).subscribe(
        (response) => {
          // Handle the API response here
          console.log('Login successful:', response);
        },
        (error) => {
          // Handle errors here
          console.error('Login error:', error);
        }
      );
    }
  }
}
