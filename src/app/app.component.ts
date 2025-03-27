import { Component, importProvidersFrom } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
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
      LoginComponent
    ])
  }
}
