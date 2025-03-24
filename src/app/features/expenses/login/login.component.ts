import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/RouteGuard/auth.service';
import { catchError, tap, throwError } from 'rxjs';
import { LoginResponse } from '../../../interface/user.interface';
import { AuthStore } from '../../../services/RouteGuard/Akita/auth.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  router: Router;

  constructor(private fb: FormBuilder, private rt: Router, public authService: AuthService, private authStore: AuthStore) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      passWord: ['', Validators.required]
    })
    this.router = this.rt
  }

  ngOnInit(): void {

  }

  loginAction() {
    const userNameValue: string = this.loginForm.value.userName;
    const passWordValue: string = this.loginForm.value.passWord;


    this.authService.signInWithAdminAccount(userNameValue, passWordValue).pipe(tap((res: LoginResponse) => {
      this.authStore.update({ token: res.token })
      this.router.navigate(['/expense-list']);
    }), catchError(err => {
      console.error('Đăng nhập thất bại:', err);
      return throwError(() => err)
    })).subscribe()

  }

}
