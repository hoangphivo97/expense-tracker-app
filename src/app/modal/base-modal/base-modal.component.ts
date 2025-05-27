import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { DialogActionEnum, DialogData } from '../../interface/modal.interface';
import { ExpenseService } from '../../services/ExpenseService/expense.service';
import { MatButton } from '@angular/material/button';
import { ErrorModalService } from '../../services/utils/error-modal.service';

@Component({
  selector: 'app-base-modal',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent, MatDialogTitle, MatButton],
  templateUrl: './base-modal.component.html',
  styleUrl: './base-modal.component.scss'
})
export class BaseModalComponent {
  readonly dialogRef = inject(MatDialogRef<BaseModalComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly expenseService = inject(ExpenseService)
  readonly errorModalService = inject(ErrorModalService)

  dialogActionEnum = DialogActionEnum


  onSave() {
    const isCancel: boolean = this.data.action === DialogActionEnum.Cancel
    const isSuccess: boolean = this.data.isSuccess === true
    if (isCancel && isSuccess) {
      this.errorModalService.closeAllModals();
    } else {
      this.expenseService.deleteExpense(this.data.data as string).subscribe(
        {
          error: e => { console.log(e) },
          complete: () => this.dialogRef.close({ title: "Delete", action: this.dialogActionEnum.Delete, isSuccess: true } as DialogData)
        }
      )
    }
  }

  onCancel() {
    this.dialogRef.close({ title: "Delete", action: this.dialogActionEnum.Delete, isSuccess: false } as DialogData)
  }
}
