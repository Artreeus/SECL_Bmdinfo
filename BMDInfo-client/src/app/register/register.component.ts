import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  message = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  formSubmit(f: NgForm) {
    if (f.invalid) return;
    this.loading = true;
    const { username, email, password } = f.value;
    this.auth.register({ username, email, password }).subscribe({
      next: _ => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        this.loading = false;
        this.message = err?.error?.message || 'Registration failed';
        alert(this.message);
      }
    });
  }
}
