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

  // hasRequiredError(): boolean {
  //   const controls = [
  //     this.registerForm.get('email'),
  //     this.registerForm.get('passWord'),
  //     this.registerForm.get('confirmPassword')
  //   ];

  //   return controls.some(control =>
  //     control?.touched && control.invalid && control.hasError('required')
  //   );
  // }




}
