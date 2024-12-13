import { inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { createExpense, ExpenseList } from '../../interface/expense.interface';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, query, updateDoc, where } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private firestore: Firestore = inject(Firestore)
  private expensesCollection = collection(this.firestore, 'expenses');
  private auth: Auth = inject(Auth)

  constructor() {
  }


  getExpenseList(): Observable<ExpenseList[]> {
    const userId = this.auth.currentUser?.uid;
    if (!userId) throw new Error('User is not logged in');
    // Use AngularFire's collectionData to fetch and map the data
    // return collectionData(this.expensesCollection, { idField: 'id' }) as Observable<ExpenseList[]>;
    const userExpensesQuery = query(this.expensesCollection, where('userId', '==', userId));
    return collectionData(userExpensesQuery, { idField: 'id' }) as Observable<ExpenseList[]>;
  }

  createExpense(data: Omit<createExpense, 'userId'>) {
    const userId = this.auth.currentUser?.uid;
    if (!userId) throw new Error('User is not logged in');

    const expenseWithUser = { ...data, userId };
    return from(addDoc(this.expensesCollection, expenseWithUser));
  }


  editExpense(id: string, data: Omit<createExpense, 'userId'>) {
    const expenseRef = doc(this.firestore, `expenses/${id}`);
    return from(updateDoc(expenseRef, data));
  }


  deleteExpense(id: string) {
    const expenseRef = doc(this.firestore, `expenses/${id}`);
    return from(deleteDoc(expenseRef));
  }


  // searchExpenseDate(searchTerm: string): Observable<ExpenseList[]> {
  //   const q = query(this.expensesCollection, where('date', '==', searchTerm))
  //   return from(getDocs(q)).pipe(map(expenseSnapshot => {
  //     return expenseSnapshot.docs.map(docs => ({
  //       id: docs.id,
  //       ...docs.data() as Omit<ExpenseList, 'id'>
  //     }))
  //   }))
  // }
}
