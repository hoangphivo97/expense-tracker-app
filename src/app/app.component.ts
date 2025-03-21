import { Component, importProvidersFrom } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './services/RouteGuard/Auth Redux/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './services/RouteGuard/Auth Redux/auth.effects';
import { LoginComponent } from './features/expenses/login/login.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AngularFireAuthModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'expense-tracker-app';

  static bootstrap(){
    return importProvidersFrom([
      StoreModule.forRoot({auth:authReducer}),
      EffectsModule.forRoot([AuthEffects]),
      LoginComponent
    ])
  }
}
