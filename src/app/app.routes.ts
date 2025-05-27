import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/expenses/login/login.component';
import { ExpenseListComponent } from './features/expenses/expense-list/expense-list.component';
import { authGuard } from './services/RouteGuard/auth.guard';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'expense-list', component: ExpenseListComponent, canActivate: [authGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }