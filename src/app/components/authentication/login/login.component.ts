import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { log } from 'console';
import { AlertService } from '../../../shared/alert/alert.service';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;
  errorMessage: string | null = null;


  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private alertService: AlertService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {

    this.loaderService.show(); // Show the loader when component loads
    // Simulate data loading with a timeout
    setTimeout(() => {
      this.loaderService.hide(); // Hide the loader when loading completes
    }, 2000);


    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }


  login() {
    if (this.loginForm.valid) {
      const login = this.loginForm.value;

      this.authService.login(login).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/dashboard']);
        },

        error: (error) => {
          this.errorAlert()
          console.error(error, "This user does not exist");
          this.errorMessage = error.message;
        }
      });
    }
  }

  errorAlert(){
    this.alertService.showAlert('error', 'Something went wrong', 'This user does not exist!');
  }

}
