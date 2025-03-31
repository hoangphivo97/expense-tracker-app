import { CanActivate, Router } from '@angular/router';
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
    return new Observable<boolean>((observer) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          observer.next(true);
        } else {
          this.router.navigate(['/login']); // Redirect to login if not authenticated
          observer.next(false);
        }
        observer.complete();
      });
    });
  }
}
