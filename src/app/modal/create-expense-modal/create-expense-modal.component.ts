import { Component, inject, OnChanges, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogActionEnum, DialogData } from '../../interface/modal.interface';
import { MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { ExpenseService } from '../../services/ExpenseService/expense.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats, MatOption } from '@angular/material/core';
import { CustomDateAdapter } from '../../shared/custom-date';
import { createExpense, editExpense, PaidMethodDropdownList, PaidMethodEnum } from '../../interface/expense.interface';
import { DecimalPipe } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { MatSelect } from '@angular/material/select';
import { PaidMethodStringValue } from '../../strings/login.strings';

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
  imports: [MatDialogTitle, MatDialogContent, MatFormField, MatLabel, ReactiveFormsModule, MatInputModule, MatButton, MatDatepickerModule, DecimalPipe, MatSelect, MatOption],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    DecimalPipe
  ],
  templateUrl: './create-expense-modal.component.html',
  styleUrl: './create-expense-modal.component.scss',
})
export class CreateExpenseModalComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<CreateExpenseModalComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  private formBuilder = inject(FormBuilder)
  readonly expenseService = inject(ExpenseService)
  private decimalPipe = inject(DecimalPipe)
  private auth: Auth = inject(Auth)

  formattedValue: string = '';
  dialogActionEnum = DialogActionEnum

  paidMethodCurrVal: PaidMethodEnum = PaidMethodEnum.CASH

  paidMethodDropdownList: PaidMethodDropdownList[] = [
    { name: PaidMethodStringValue.CASH, value: PaidMethodEnum.CASH },
    { name: PaidMethodStringValue.CREDIT_CARD, value: PaidMethodEnum.CREDIT_CARD },
    { name: PaidMethodStringValue.BANK_TRANSFER, value: PaidMethodEnum.BANK_TRANSFER },
  ]

  createExpenseForm = this.formBuilder.group({
    date: ['', Validators.required],
    description: ['', Validators.required],
    purpose: ['', Validators.required],
    paid: [0, Validators.required],
    for: [''],
    amount: [0, Validators.required]
  })

  async ngOnInit(): Promise<void> {
    await this.patchValue()
  }

  patchValue() {
    if (this.data.action !== this.dialogActionEnum.Edit) return;
    this.createExpenseForm.patchValue(this.data.data as createExpense)
  }


  onSave() {
    if (!this.createExpenseForm.valid) return
    const expenseData = this.createExpenseForm.value as unknown as (createExpense | editExpense)
    const ISODate = new Date(expenseData.date).toISOString();
    const payload: createExpense | editExpense = {
      ...expenseData,
      date: ISODate,
    }

    if (this.data.action === this.dialogActionEnum.Create) {
      this.createExpense(payload as createExpense)
    } else if (this.data.action === this.dialogActionEnum.Edit) {
      this.editExpense((this.data.data as editExpense).id, payload as editExpense)
    } else {

    }
  }

  createExpense(payload: createExpense) {
    this.expenseService.createExpense(payload).subscribe(
      {
        error: e => { console.log(e) },
        complete: () => this.dialogRef.close({ title: "Create new Expense", action: this.dialogActionEnum.Create, isSuccess: true } as DialogData)
      }
    )
  }

  editExpense(id: string, payload: editExpense) {
    this.expenseService.editExpense(id, payload).subscribe(
      {
        error: e => { console.log(e) },
        complete: () => this.dialogRef.close({ title: "Edit Expense", action: this.dialogActionEnum.Edit, isSuccess: true } as DialogData
        )
      }
    )
  }

  onCancel() {
    this.dialogRef.close({ title: "Create new Expense", action: this.dialogActionEnum.Create, isSuccess: false } as DialogData)
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let rawValue = inputElement.value.replace(/,/g, ''); // Remove commas
    let numericValue = parseFloat(rawValue); // Parse as float

    // Update the form control with raw numeric value
    if (!isNaN(numericValue)) {
      this.createExpenseForm.get('amount')?.setValue(numericValue, { emitEvent: false }); // Don't emit value changes
    } else {
      this.createExpenseForm.get('amount')?.setValue(null, { emitEvent: false });
    }

    // Format the display value
    const formattedValue = this.decimalPipe.transform(numericValue, '1.0-2') || '';
    inputElement.value = formattedValue; // Update input value instantly
  }

}
