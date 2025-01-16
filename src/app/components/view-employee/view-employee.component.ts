import { Component } from '@angular/core';
import { Employee } from '../../model/employeeModel';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [],
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.css',
})
export class ViewEmployeeComponent {
  id!: number;
  employee!: Employee;
  employees!: Employee[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeesService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.employee = new Employee();
    this.employeeService.getEmployeeById(this.id).subscribe((data) => {
      this.employee = data;
    });
  }

  public deleteByEmployeeId(id: number) {
    this.employeeService.deleteEmployee(id).subscribe((data) => {
      this.getAllEmployees();
    });
  }

  public getAllEmployees() {
    this.router.navigate(['/dashboard']);
    // this.employeeService.getAllEmployees().subscribe(data => {this.employees = data})
  }

  updateEmployeeById(id: number) {
    this.router.navigate(['/dashboard', id]);
    console.log('Update Id', id);
  }

  back(): void {
    this.router.navigate(['/dashboard']);
  }
}
