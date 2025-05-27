import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogActions, MatDialogContent, MatDialogTitle, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { DialogError } from '../../interface/modal.interface';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-error-modal',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent, MatDialogTitle, MatButton, MatIconModule, FontAwesomeModule],
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.scss'
})
export class ErrorModalComponent {
  message: string | null = null;
  dialogRef = inject(MatDialogRef<ErrorModalComponent>)
  data = inject<DialogError>(MAT_DIALOG_DATA)
  iconBug = faBug

  constructor() { }

  onCancel() {
    this.dialogRef.close()
  }
}
