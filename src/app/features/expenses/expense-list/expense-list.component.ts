import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { createExpense, ExpenseList } from '../../../models/expense.interface';
import { ExpenseService } from '../../../services/ExpenseService/expense.service';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpenseListFieldName } from '../../../strings/login.strings';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog'
import { CreateExpenseModalComponent } from '../../../modal/create-expense-modal/create-expense-modal.component';
import { DialogData } from '../../../models/modal.interface';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NgbPaginationModule, NgbHighlight, FormsModule, AsyncPipe, DecimalPipe, CommonModule, MatButtonModule, MatTableModule, MatIconModule],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss'
})
export class ExpenseListComponent implements OnInit {
  expenseList: ExpenseList[] = [];
  searchTerm: string = ""
  expenseListTableName = ExpenseListFieldName
  displayedColumns: string[] = ['date', 'description', 'purpose', 'paid', 'for', 'amount', 'action'];
  readonly dialog = inject(MatDialog)

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    this.getExpenseList();
  }

  getExpenseList() {
    this.expenseService.getExpenseList().subscribe((res: ExpenseList[]) => {
      this.expenseList = res
    })
  }

  openCreateExpenseModal() {
    // const dialogSize = {
    //   height: '500px',
    //   width: '600px'
    // }
    const dialogRef =  this.dialog.open(CreateExpenseModalComponent, {
      height: '400px',
      width: '600px',
      data: { title: "Create new Expense", action: "Create", isSuccess: false } as DialogData,
      disableClose: true
    })

    dialogRef.afterClosed().subscribe((res: DialogData) => {
      if(!res.isSuccess) return
      this.getExpenseList()
    })
}

}
