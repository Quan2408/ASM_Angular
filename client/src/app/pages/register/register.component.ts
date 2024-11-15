import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
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
    return this.registerForm.get('email');
  }
  get username() {
    return this.registerForm.get('username');
  }
  get password() {
    return this.registerForm.get('password');
  }
  handleRegister() {
    if (this.registerForm.invalid) {
      alert('Register is not correct!');
      return;
    }

    this.authService.registerUser(this.registerForm.value).subscribe({
      next: () => {
        this.toast.success('Successfully');
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        console.error('Register error:', err);
        alert('Error!');
      },
    });
  }
}
