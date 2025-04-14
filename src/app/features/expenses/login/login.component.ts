import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/RouteGuard/auth.service';
import { catchError, tap, throwError } from 'rxjs';
import { LoginResponse } from '../../../interface/user.interface';
import { AuthStore } from '../../../services/RouteGuard/Akita/auth.store';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseError } from 'firebase/app';
import { ErrorModalService } from '../../../services/utils/error-modal.service';
import { RegisterModalComponent } from '../../../modal/register-modal/register-modal.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatCheckboxModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  router: Router;
  readonly dialog = inject(MatDialog)

  loading: boolean = false;

  constructor(private fb: FormBuilder, private rt: Router, public authService: AuthService, private authStore: AuthStore, private errorModalService: ErrorModalService) {
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


    this.authService.signInWithUserAccount(userNameValue, passWordValue).pipe(tap((res: LoginResponse) => {
      this.updateTokenAndReRoute(res.token, '/expense-list')
    }), catchError((err: FirebaseError) => {
      // console.error('Đăng nhập thất bại:', err);
      this.errorModalService.openErrorModal(err)
      return throwError(() => err)
    })).subscribe()

  }

  loginWithGoogle() {
    if (this.loading) return
    this.loading = true

    this.authService.signInWithGoogleAccount().pipe(
      tap((res: any) => {
        this.updateTokenAndReRoute(res.token, '/expense-list')
        this.loading = false;
      }), catchError((err: FirebaseError) => {
        this.errorModalService.openErrorModal(err)
        this.loading = false;
        return throwError(() => err)
      })
    ).subscribe()
  }

  loginWithFacebook() {
    if (this.loading) return
    this.loading = true

    this.authService.signInWithFacebookAccount().pipe(
      tap((res: any) => {
        this.updateTokenAndReRoute(res.token, '/expense-list')
        this.loading = false;
      }), catchError((err: FirebaseError) => {
        this.errorModalService.openErrorModal(err)
        this.loading = false;
        return throwError(() => err)
      })
    ).subscribe()
  }

  updateTokenAndReRoute(token: string, direction: string) {
    this.authStore.update({ token: token })
    localStorage.setItem('token', token)
    this.router.navigate([direction]);
  }

  openRegisterModal(){
    this.dialog.open(RegisterModalComponent, {
      height: '500px',
      width: '450px',
      disableClose: false
    })
  }

}
