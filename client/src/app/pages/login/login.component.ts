import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  authService = inject(AuthService);
  router = inject(Router);
  toast = inject(HotToastService);
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
  handleLogin() {
    if (this.loginForm.invalid) {
      alert('Login is not correct!');
      return;
    }

    this.authService.loginUser(this.loginForm.value).subscribe({
      next: (data) => {
        // Kiểm tra và đảm bảo rằng dữ liệu phản hồi có accessToken và user
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('userId', data.user._id);
        this.toast.success('Successfully');
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.error('Login error:', err);
        this.toast.error('Login error!');
      },
    });
  }
}
