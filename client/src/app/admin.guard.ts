import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('token');
    const userRole = this.authService.getUserRole();

    console.log('Token:', token); // Xem token
    console.log('User Role:', userRole); // Xem vai trò

    if (token && userRole === 'admin') {
      return true; // Cho phép truy cập
    }

    // Sử dụng SweetAlert2 để hiển thị popup thông báo
    Swal.fire({
      title: 'Page not found!',
      text: 'You are not an admin!',
      icon: 'warning',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/']); // Điều hướng sau khi popup đóng
      }
    });

    return false; // Ngăn không cho truy cập
  }
}
