import { Routes } from '@angular/router';
import { LoginComponent } from './features/expenses/login/login.component';
import { ExpenseListComponent } from './features/expenses/expense-list/expense-list.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {path: 'expense-list', component: ExpenseListComponent}
];
