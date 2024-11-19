import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../models/modal.interface';
import { MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { ExpenseService } from '../../services/ExpenseService/expense.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { CustomDateAdapter } from '../../shared/custom-date';
import { createExpense } from '../../models/expense.interface';

export const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY', // Format for input parsing
  },
  display: {
    dateInput: 'DD/MM/YYYY', // Format displayed in the input field
    monthYearLabel: 'MMM YYYY', // Format for the month-year view
    dateA11yLabel: 'LL', // Accessibility format for date
    monthYearA11yLabel: 'MMMM YYYY', // Accessibility format for month-year
  },
}

@Component({
  selector: 'app-create-expense-modal',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatFormField, MatLabel, ReactiveFormsModule, MatInputModule, MatButton, MatDatepickerModule],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  templateUrl: './create-expense-modal.component.html',
  styleUrl: './create-expense-modal.component.scss',
})
export class CreateExpenseModalComponent {
  readonly dialogRef = inject(MatDialogRef<CreateExpenseModalComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  private formBuilder = inject(FormBuilder)
  readonly expenseService = inject(ExpenseService)


  createExpenseForm = this.formBuilder.group({
    date: ['', Validators.required],
    description: ['', Validators.required],
    purpose: ['', Validators.required],
    paid: ['', Validators.required],
    for: [''],
    amount: ['', Validators.required]
  })


  onSave() {
    if (!this.createExpenseForm.valid) return
    const expenseData = this.createExpenseForm.value as unknown as createExpense
    const ISODate = new Date(expenseData.date).toISOString();
    const payload: createExpense = {
      ...expenseData,
      date: ISODate,
    }
    this.expenseService.createExpense(payload).subscribe(
      {
        error: e => { console.log(e) },
        complete: () => this.dialogRef.close({ title: "Create new Expense", action: "Create", isSuccess: true } as DialogData)
      }
    )
  }

  onCancel() {
    this.dialogRef.close({ title: "Create new Expense", action: "Create", isSuccess: false })
  }

}
