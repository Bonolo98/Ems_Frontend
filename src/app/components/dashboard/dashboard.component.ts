import { Component } from '@angular/core';
import { Employee } from '../../model/employeeModel';
import { Router } from '@angular/router';
import { EmployeesService } from '../../services/employees.service';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, NavbarComponent,FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  employees!: Employee[];
  employee!: Employee;
  query:string ='';


  totalEmployees!: number;

  constructor(private employeeService: EmployeesService,
    private router: Router, private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.show();
    setTimeout(() => {
      this.loaderService.hide();
    }, 2000);
    
    this.getAllEmployees();
  }

  // ============================================== CRUD METHODS ============================================== //

  addEmployees() {
    this.router.navigate(['/add']);
  }

  public getEmployeeById(id: number) {
    this.router.navigate(['/view', id]);
  }

  public getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.totalEmployees = data.length;
      },
      error: (error) => {
        console.error('Error fetching employee data:', error);
      }
    });
  }

  public deleteByEmployeeId(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(data => { 
      this.employee = data;
     })
  }

  updateEmployeeById(id: number) {
    this.router.navigate(['/update', id])
    console.log("Update", id)
  }

  // ============================================== OTHER METHODS ============================================== //


  getTotalEmployees() {
    this.getAllEmployees();
  }


  searchEmployees():void {
    this.employeeService.searchEmployees(this.query).subscribe((data: Employee[]) => {
      this.employees = data;
    }, (error) => {
      console.log('Error getting Employees', error)
    }
  
  );
  }

  Search(): void {
    this.searchEmployees();
  }

}
