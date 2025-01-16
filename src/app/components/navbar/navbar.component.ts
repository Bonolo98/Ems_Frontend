import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  user: any;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (error) => {
        console.error('Could not fetch user data', error)
      }
    })
  }

  logout() {
    this.authService.logout();
    // this.router.navigate(['/login']);
  }

}
