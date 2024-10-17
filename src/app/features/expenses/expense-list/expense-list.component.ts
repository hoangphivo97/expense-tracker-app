import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { ExpenseList } from '../../../models/expense.interface';
import { ExpenseService } from '../../../services/ExpenseService/expense.service';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NgbPaginationModule, NgbHighlight, FormsModule, AsyncPipe, DecimalPipe],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss'
})
export class ExpenseListComponent implements OnInit {
  expenseList: ExpenseList[] = [];
  searchTerm: string = ""

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    this.getExpenseList();
  }

  getExpenseList() {
    this.expenseService.getExpenseList().subscribe((res: ExpenseList[]) => {
      this.expenseList = res
    })
  }
}
