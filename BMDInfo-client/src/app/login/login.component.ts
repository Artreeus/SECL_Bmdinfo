import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  message: string = '';
  loading = false;
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Check if already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  formSubmit(data: NgForm) {
    if (data.invalid) return;

    this.loading = true;
    const loginRequest = {
      username: data.value.name,
      password: data.value.password
    };

    this.authService.login(loginRequest).subscribe({
      next: (response) => {
        this.loading = false;
        this.message = 'Login Successful!';
        this.showMessage();
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1000);
      },
      error: (err) => {
        this.loading = false;
        this.message = err?.error?.message || 'Invalid username or password';
        alert(this.message);
      }
    });
  }

  
  showMessageFlag: boolean = false;


public  closeMessage() {
    this.showMessageFlag = false;
  }
 public showMessage() {
    this.showMessageFlag = true;
    setTimeout(() => {
      this.showMessageFlag = false;
    }, 3000);
  }


}
