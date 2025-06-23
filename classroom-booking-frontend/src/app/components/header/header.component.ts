import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [RouterModule],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  constructor(private auth: AuthService, private router: Router) {}

  logOut() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}