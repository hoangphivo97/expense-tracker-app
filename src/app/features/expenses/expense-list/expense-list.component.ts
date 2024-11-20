import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { editExpenseData, ExpenseList } from '../../../models/expense.interface';
import { ExpenseService } from '../../../services/ExpenseService/expense.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpenseListFieldName } from '../../../strings/login.strings';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog'
import { CreateExpenseModalComponent } from '../../../modal/create-expense-modal/create-expense-modal.component';
import { DialogData } from '../../../models/modal.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NgbPaginationModule, FormsModule, DecimalPipe, CommonModule, MatButtonModule, MatTableModule, MatIconModule],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss',
})
export class ExpenseListComponent implements OnInit, OnDestroy {
  expenseList: ExpenseList[] = [];
  searchTerm: string = ""
  expenseListTableName = ExpenseListFieldName
  displayedColumns: string[] = ['date', 'description', 'purpose', 'paid', 'for', 'amount', 'action'];
  readonly dialog = inject(MatDialog)
  private destroy$ = new Subject<void>()

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
    // const dialogSize = {
    //   height: '500px',
    //   width: '600px'
    // }
    const dialogRef = this.dialog.open(CreateExpenseModalComponent, {
      height: '400px',
      width: '600px',
      data: { title: "Create new Expense", action: "Create", isSuccess: false } as DialogData,
      disableClose: true
    })

    dialogRef.afterClosed().subscribe((res: DialogData) => {
      if (!res.isSuccess) return
      this.getExpenseList()
    })
  }

  openEditExpenseModal(data: editExpenseData) {
    const dialogRef = this.dialog.open(CreateExpenseModalComponent, {
      height: '400px',
      width: '600px',
      data: { title: "Edit Expense", action: "Edit", isSuccess: false, data: data } as DialogData,
      disableClose: true
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // Emit the signal to unsubscribe
    this.destroy$.complete(); // Complete the subject
  }

}
