import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { createExpense, ExpenseList } from '../../interface/expense.interface';
import { db } from '../../environment/environment';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, QuerySnapshot, updateDoc, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  expensesCollection = collection(db, 'expense')
  private firestore = getFirestore();

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

  createExpense(data: createExpense) {
    return from(addDoc(this.expensesCollection, data))
  }

  editExpense(id: string, data: createExpense) {
    const expenseRef = doc(this.firestore, 'expense', id);
    return from(updateDoc(expenseRef, data))
  }

  deleteExpense(id: string) {
    const expenseRef = doc(this.firestore, 'expense', id);
    return from(deleteDoc(expenseRef))
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
