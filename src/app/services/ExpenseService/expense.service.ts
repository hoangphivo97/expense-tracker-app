import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { from, map, Observable } from 'rxjs';
import { ExpenseList } from '../../models/expense.interface';
import { db } from '../../environment/environment';
import { collection, doc, getDocs, query, QuerySnapshot, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  expensesCollection = collection(db, 'expense')

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
