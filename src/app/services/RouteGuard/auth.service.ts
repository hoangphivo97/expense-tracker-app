import { inject, Injectable } from '@angular/core';
// import { signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { Auth, signInWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router: Router = inject(Router)
  private auth: Auth = inject(Auth)

  signInWithEmailAndPassword(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password))
  }

  signOut() {
    return from(signOut(this.auth).then(() => {
      this.router.navigate(['/login'])
    }).catch((error) => console.log(error)))
  }

}
