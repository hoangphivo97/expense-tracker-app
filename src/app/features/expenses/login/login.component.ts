import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginStrings } from '../../../strings/login.strings';
import { AuthService } from '../../../services/RouteGuard/auth.service';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../environment/environment';

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

  constructor(private fb: FormBuilder, private rt: Router, public authService: AuthService) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      passWord: ['', Validators.required]
    })
    this.router = this.rt
  }

  ngOnInit(): void {

  }

  async loginAction(): Promise<void> {
    const userNameValue: string = this.loginForm.value.userName;
    const passWordValue: string = this.loginForm.value.passWord;

    this.authService.signInWithEmailAndPassword(userNameValue, passWordValue).subscribe(() => {
      this.router.navigate(['/expense-list']);
    })

  }

}
