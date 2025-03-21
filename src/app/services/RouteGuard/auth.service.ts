import { Injectable } from '@angular/core';
// import { signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../interface/user.interface';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {

  }
  // signInWithEmailAndPassword(email: string, password: string): Observable<UserCredential> {
  //   return from(signInWithEmailAndPassword(this.auth, email, password))
  // }

  // signOut() {
  //   return from(signOut(this.auth).then(() => {
  //     this.router.navigate(['/login'])
  //   }).catch((error) => console.log(error)))
  // }

  signInWithAdminAccount(username: string, password: string): Observable<LoginResponse> {
    const loginData = { username, password }
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginData)
  }

}


