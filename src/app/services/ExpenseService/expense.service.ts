import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { createExpense, ExpenseList } from '../../models/expense.interface';
import { db } from '../../environment/environment';
import { addDoc, collection, getDocs, query, QuerySnapshot, where } from 'firebase/firestore';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  expensesCollection = collection(db, 'expense')
  firestoreUrl = ''

  constructor() {
  }

  getExpenseList(): Observable<ExpenseList[]> {
    return from(getDocs(this.expensesCollection)).pipe(
      map((expenseSnapshot: QuerySnapshot) => {
        return expenseSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as Omit<ExpenseList, 'id'>
        }))
      })
    )
  }

  createExpense(data: createExpense){
    return from(addDoc(this.expensesCollection, data))
  }

  searchExpenseDate(searchTerm: string): Observable<ExpenseList[]> {
    const q = query(this.expensesCollection, where('date', '==', searchTerm))
    return from(getDocs(q)).pipe(map(expenseSnapshot => {
      return expenseSnapshot.docs.map(docs => ({
        id: docs.id,
        ...docs.data() as Omit<ExpenseList, 'id'>
      }))
    }))
  }
}
