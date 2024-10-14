import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { LoginStrings } from '../../../strings/login.strings';

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
  errorMessage: string = LoginStrings.loginError

  constructor(private fb: FormBuilder, private rt: Router) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      passWord: ['', Validators.required]
    })
    this.router = this.rt
  }

  ngOnInit(): void {

  }

  loginAction(): void {
    if (this.loginForm.value.userName === "admin" && this.loginForm.value.passWord === "admin") {
      this.router.navigate(['/expense-list'])
      console.log('success')
    } else {
      throwError(() => new Error(this.errorMessage))
    }
  }

}
