import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

  constructor(private router: Router) {}

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form submitted successfully', this.loginData);
      // Here you would typically handle authentication
      // this.router.navigate(['/']);
    } else {
      console.log('Form is invalid');
    }
  }
}
