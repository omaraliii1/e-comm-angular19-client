import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { localStorageService } from '../_services/localStorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageService: localStorageService
  ) {}

  canActivate(): boolean {
    const isTokenExpired = this.localStorageService.isTokenExpired();

    if (isTokenExpired) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
