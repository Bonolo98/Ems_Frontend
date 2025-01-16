import { Component, NgModule } from '@angular/core';
import { Employee } from '../../model/employeeModel';
import { Router } from '@angular/router';
import { EmployeesService } from '../../services/employees.service';
import { Departments } from '../../model/departmentModel';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../shared/alert/alert.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent {
  addForm!: FormGroup;

  employee: Employee = new Employee();
  departments = Object.values(Departments);

  errorMessage: string | null = null;

  data: any;

  constructor(
    private employeeService: EmployeesService,
    private router: Router,
    private alertService: AlertService,
    private formbuilder: FormBuilder
  ) {}

  // ngOnInit(): void {
  //   this.addForm = this.formbuilder.group({
  //     firstname: [['', Validators.required, Validators.minLength(5)]],
  //     lastname: [['', Validators.required, Validators.minLength(5)]],
  //     employeeNumber: [['', Validators.required, Validators.minLength(1)]],
  //     // department: [['', Validators.required, Validators.minLength(1)]],
  //     email: [['']],
  //     contacts: [['', Validators.required, Validators.minLength(10)]],
  //   });

  //   console.log(this.data);
  // }

  ngOnInit(): void {
    this.addForm = this.formbuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(5)]],
      lastname: ['', [Validators.required, Validators.minLength(5)]],
      employeeNumber: ['', [Validators.required, Validators.minLength(1)]],
      email: [''],
      contacts: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  public addEmployee() {
    console.log("Before DI")
    this.employeeService.addEmployee(this.employee).subscribe((data) => {
      data = this.employee;
      console.log(data)
      this.successAlert();
    });
  }

  goToEmployees() {
    this.router.navigate(['/dashboard']);
  }

  onSubmit() {
    if (this.addForm.valid === null) {
      this.errorAlert();
    } else {
      this.addEmployee();
      this.router.navigate(['/dashboard']).then(() => {
        window.location.reload;
      });
    }
  }

  successAlert() {
    this.alertService.showAlert(
      'success',
      'Successful',
      'Employee has been added!'
    );
  }

  errorAlert() {
    this.alertService.showAlert(
      'error',
      'Employee not added',
      'Could not add the employee, please try again'
    );
  }

  back(): void {
    this.router.navigate(['/dashboard']);
  }
}
