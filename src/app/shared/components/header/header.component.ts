import { Component } from '@angular/core';
import { AuthService } from '../../../services/RouteGuard/auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(public authService: AuthService, private router: Router){}

  logout(){
    this.authService.signOut();
  }

}
