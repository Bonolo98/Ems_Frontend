import { Component, NgModule } from '@angular/core';
import { Employee } from '../../model/employeeModel';
import { Router } from '@angular/router';
import { EmployeesService } from '../../services/employees.service';
import { Departments } from '../../model/departmentModel';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { AlertService } from '../../shared/alert/alert.service';
import { error } from 'console';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {

  addForm!: FormGroup;

  employee: Employee = new Employee();
  departments = Object.values(Departments);

  errorMessage: string | null = null;

 constructor(private employeeService: EmployeesService,
  private router: Router, private alertService: AlertService, private formbuilder: FormBuilder){
  }

 ngOnInit(): void {
  this.addForm = this.formbuilder.group({
    firstname: [['', Validators.required, Validators.minLength(5)]],
    lastname: [['', Validators.required, Validators.minLength(5)]],
    employeeNumber: [['', Validators.required, Validators.minLength(1)]],
    department: [['', Validators.required, Validators.minLength(1)]],
    email: [['']],
    contacts: [['', Validators.required, Validators.minLength(10)]]

  })
}

public addEmployee(){
  this.employeeService.addEmployee(this.employee).subscribe(data => {
    data = this.employee;
    this.successAlert();
  });

}

goToEmployees(){
  this.router.navigate(['/dashboard']);
}


onSubmit() {
  this.addEmployee();
  this.router.navigate(['/dashboard']).then(() => {window.location.reload});
}

successAlert(){
  this.alertService.showAlert('success', 'Something went wrong', 'This user does not exist!');
}

errorAlert(){
  this.alertService.showAlert('error', 'Employee not added', 'Could not add the employee, please try again');
}


back():void {
  this.router.navigate(['/dashboard']);
}

}
