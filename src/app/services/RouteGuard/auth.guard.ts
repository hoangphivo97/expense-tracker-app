import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Auth, User, user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class authGuard implements CanActivate {
  private router: Router = inject(Router);
  private auth: Auth = inject(Auth);
  private user$ = user(this.auth);

  canActivate(): Observable<boolean> {
    const currentRoute = this.router.routerState.snapshot.url;
    const currentRouteIsLogin = currentRoute === '/login';
    return this.user$.pipe(
      map((user: User): any => {
        if (user) {
          return true;
        } else if (user && currentRouteIsLogin) {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/login'])
          return false
        }
      })
    )
  }
}
