import { CanActivate, Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { AuthStore } from './Akita/auth.store';

@Injectable({
  providedIn: 'root'
})

export class authGuard implements CanActivate {
  private router: Router = inject(Router);
  private authStore: AuthStore = inject(AuthStore)

  canActivate(): boolean {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
    if (token) {
      return true;
    }
  
    this.router.navigate(['/login']);
    return false;
  }
}
