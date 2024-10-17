import { inject, Injectable } from '@angular/core';
import { signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { auth } from '../../environment/environment';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router: Router = inject(Router)

  signInWithEmailAndPassword(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(auth, email, password))
  }

  signOut() {
    return from(signOut(auth).then(() => {
      console.log('signed out')
      this.router.navigate(['/login'])
    }).catch((error) => console.log(error)))
  }

}
