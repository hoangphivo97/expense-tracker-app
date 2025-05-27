import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogActionEnum } from '../../interface/modal.interface';
import { ConfirmExitModal } from '../../strings/login.strings';

@Component({
  selector: 'app-register-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.scss'
})
export class RegisterModalComponent {
  readonly dialogRef = inject(MatDialogRef<RegisterModalComponent>);
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      passWord: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }


  onSubmit() {

  }

  onCancel() {
    const isEmpty: boolean = Object.values(this.registerForm.value).every(value => !value);

    if (!isEmpty) {
      this.openConfirmModal(ConfirmExitModal.TITLE, ConfirmExitModal.YOUR_DATA_WILL_LOST);
    } else {
      console.log(this.registerForm.value)
      this.dialogRef.close()
    }
  }

  openConfirmModal(title: string, message: string) {
    this.dialog.open(BaseModalComponent, {
      height: '200px',
      width: '400px',
      data: { title: title, content: message, action: DialogActionEnum.Cancel, isSuccess: true },
      disableClose: true
    })
  }

  getErrorMessage(fieldName: string): string | null {
    const control = this.registerForm.get(fieldName)
    if (control?.touched) {
      if (control.hasError('required')) return 'This field is required';
      if (control.hasError('email')) return 'Invalid Email';
    }

    return null
  }

  get confirmPasswordField(){
    return this.registerForm.get('confirmPassword')
  }

  get checkPassAndConfPass() {
    return this.registerForm.get('passWord')?.value !== this.confirmPasswordField?.value
  }

}
