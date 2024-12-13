import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { createExpense, editExpense, ExpenseList } from '../../../interface/expense.interface';
import { ExpenseService } from '../../../services/ExpenseService/expense.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpenseListFieldName, ModalMessage } from '../../../strings/login.strings';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { CreateExpenseModalComponent } from '../../../modal/create-expense-modal/create-expense-modal.component';
import { DialogActionEnum, DialogData } from '../../../interface/modal.interface';
import { Subject, takeUntil } from 'rxjs';
import { BaseModalComponent } from '../../../modal/base-modal/base-modal.component';
import { UserServiceService } from '../../../services/UserService/user-service.service';
import { CurrencyEnum } from '../../../interface/settings.interface';
import { SettingsServiceService } from '../../../services/SettingsService/settings-service.service';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NgbPaginationModule, FormsModule, DecimalPipe, CommonModule, MatButtonModule, MatTableModule, MatIconModule],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss',
})
export class ExpenseListComponent implements OnInit, OnDestroy {
  readonly userService = inject(UserServiceService)
  readonly settingsService = inject(SettingsServiceService)
  expenseList: ExpenseList[] = [];
  searchTerm: string = ""
  expenseListTableName = ExpenseListFieldName
  displayedColumns: string[] = ['date', 'description', 'purpose', 'paid', 'for', 'amount', 'action'];
  readonly dialog = inject(MatDialog)
  private destroy$ = new Subject<void>()
  dialogActionEnum = DialogActionEnum

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    this.getExpenseList();
  }

  getExpenseList() {
    this.expenseService.getExpenseList().pipe(takeUntil(this.destroy$)).subscribe((data: ExpenseList[]) => {
      this.expenseList = data
    }, (error) => {
      console.log(error)
    })
  }

  openCreateExpenseModal() {
    const dialogRef = this.dialog.open(CreateExpenseModalComponent, {
      height: '400px',
      width: '600px',
      data: { title: "Create new Expense", action: this.dialogActionEnum.Create, isSuccess: false } as DialogData,
      disableClose: true
    })

    this.getListAfterSuccessCallApi(dialogRef)
  }

  openEditExpenseModal(data: editExpense) {
    const dialogRef = this.dialog.open(CreateExpenseModalComponent, {
      height: '400px',
      width: '600px',
      data: { title: "Edit Expense", action: this.dialogActionEnum.Edit, isSuccess: false, data: data } as DialogData,
      disableClose: true
    })

    this.getListAfterSuccessCallApi(dialogRef)
  }

  getListAfterSuccessCallApi(dialogRef: MatDialogRef<CreateExpenseModalComponent | BaseModalComponent>) {
    dialogRef.afterClosed().subscribe((res: DialogData) => {
      if (!res.isSuccess) return
      this.getExpenseList()
    })
  }

  openDeleteConfirmModal(id: string) {
    const dialogRef = this.dialog.open(BaseModalComponent, {
      height: '200px',
      width: '400px',
      data: { title: "Delete", action: this.dialogActionEnum.Delete, isSuccess: false, data: id, content: ModalMessage.delete } as DialogData,
      disableClose: true
    })

    this.getListAfterSuccessCallApi(dialogRef)
  }

  getUserSettings() {
    this.settingsService.getUserSettings().subscribe(res => {
       res?.currency as CurrencyEnum
    })
  }

  

  getEnumString(enumObj: any, value: number): string {
    return enumObj[value];
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // Emit the signal to unsubscribe
    this.destroy$.complete(); // Complete the subject
  }



}
