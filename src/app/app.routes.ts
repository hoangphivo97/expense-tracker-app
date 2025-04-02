import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/expenses/login/login.component';
import { NgModule } from '@angular/core';
import { authGuard } from './services/RouteGuard/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'expense-list', loadComponent: () => import("./features/expenses/expense-list/expense-list.component").then(m => m.ExpenseListComponent),
        canActivate: [authGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }