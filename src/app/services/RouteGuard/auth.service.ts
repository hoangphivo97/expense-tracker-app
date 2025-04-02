import { inject, Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, UserCredential, signOut } from '@angular/fire/auth';
import { firstValueFrom, from, Observable, switchMap } from 'rxjs';
import { LoginResponse } from '../../interface/user.interface';
import { HttpClient } from '@angular/common/http';
import { AuthStore } from './Akita/auth.store';
import { Router } from '@angular/router';
import { LocalStorageService } from '../LocalStorage/local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private apiUrl = 'http://localhost:3000/auth';
  private apiGoogleUrl = 'http://localhost:3000/auth/google-login';

  constructor(private http: HttpClient, private authStore: AuthStore, private router: Router) {

  }

  signInWithUserAccount(username: string, password: string): Observable<LoginResponse> {
    const loginData = { username, password }
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginData)
  }

  signInWithGoogleAccount(): Observable<Object> {
    const provider = new GoogleAuthProvider();

    return from(signInWithPopup(this.auth, provider)).pipe(
      switchMap((result: UserCredential) =>
        from(result.user.getIdToken()).pipe(
          switchMap((token: string) =>
            this.http.post(this.apiGoogleUrl, { uid: result.user.uid, token })
          )
        )
      )
    );
  }

  clearAuthData() {
    this.authStore.update({ token: null }); // Clear Akita store
    localStorage.removeItem('token'); // Remove token from local storage
    this.router.navigate(['/login']); // Redirect to login
  }

  logout() {
    const token = localStorage.getItem('token');
    if (!token) return
    const isGoogleUser = this.auth.currentUser !== null;

    if (isGoogleUser) {
      signOut(this.auth).then(() => {
        this.clearAuthData()
      })
        .catch(err => console.error('Google logout failed', err))
    } else {
      this.clearAuthData()
    }
  }

}


