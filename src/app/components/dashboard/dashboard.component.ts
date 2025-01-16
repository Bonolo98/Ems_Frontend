// import { Component, ElementRef, ViewChild } from '@angular/core';
// import { Employee } from '../../model/employeeModel';
// import { Router } from '@angular/router';
// import { EmployeesService } from '../../services/employees.service';
// import { CommonModule, NgClass, NgFor } from '@angular/common';
// import { NavbarComponent } from '../navbar/navbar.component';
// import { FormsModule } from '@angular/forms';
// import { LoaderService } from '../../services/loader.service';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [NgFor, NavbarComponent, FormsModule, CommonModule],
//   templateUrl: './dashboard.component.html',
//   styleUrl: './dashboard.component.css',
// })
// export class DashboardComponent {

//   pdfTable: any;
//   @ViewChild('htmlData') htmlData!: ElementRef;

//   employees!: Employee[];
//   employee!: Employee;
//   query: string = '';
//   tableId: any;

//   totalEmployees!: number;

//   constructor(
//     private employeeService: EmployeesService,
//     private router: Router,
//     private loaderService: LoaderService
//   ) {}

//   ngOnInit(): void {
//     this.loaderService.show();
//     setTimeout(() => {
//       this.loaderService.hide();
//     }, 2000);

//     this.getAllEmployees();
//   }

//   // ============================================== CRUD METHODS ============================================== //

//   addEmployees() {
//     this.router.navigate(['/add']);
//   }

//   public getEmployeeById(id: number) {
//     this.router.navigate(['/view', id]);
//   }

//   public getAllEmployees() {
//     this.employeeService.getAllEmployees().subscribe({

//       next: (data) => {
//         this.employees = data;
//         this.totalEmployees = data.length;
//       },
//       error: (error) => {
//         console.error('Error fetching employee data:', error);
//       },
//     });
//   }

//   public deleteByEmployeeId(id: number) {
//     this.employeeService.deleteEmployee(id).subscribe((data) => {
//       // this.employee = data;
//       // window.location.reload;
//       this.getAllEmployees();
//     });
//   }

//   updateEmployeeById(id: number) {
//     this.router.navigate(['/update', id]);
//     console.log('Update', id);
//   }

//   // ============================================== OTHER METHODS ============================================== //

//   getTotalEmployees() {
//     this.getAllEmployees();
//   }

//   searchEmployees(): void {
//     this.employeeService.searchEmployees(this.query).subscribe(
//       (data: Employee[]) => {
//         this.employees = data;
//       },
//       (error) => {
//         console.log('Error getting Employees', error);
//       }
//     );
//   }

//   Search(): void {
//     this.searchEmployees();
//   }
// }

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../model/employeeModel';
import { EmployeesService } from '../../services/employees.service';
import { LoaderService } from '../../services/loader.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    NavbarComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  displayedColumns: string[] = [
    'employeeNumber',
    'firstname',
    'lastname',
    'department',
    'email',
    'actions',
  ];
  dataSource!: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  totalEmployees!: number;

  employees!: Employee[];
  employee!: Employee;
  query: string = '';
  tableId: any;

  constructor(
    private employeeService: EmployeesService,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loaderService.show();
    setTimeout(() => {
      this.loaderService.hide();
    }, 2000);

    this.getAllEmployees();
  }

  public getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.totalEmployees = data.length;

        // Attach paginator and sorter to dataSource
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.error('Error fetching employee data:', error);
      },
    });
  }

  public deleteByEmployeeId(id: number) {
    this.employeeService.deleteEmployee(id).subscribe((data) => {
      // this.employee = data;
      // window.location.reload;
      this.getAllEmployees();
    });
  }

  updateEmployeeById(id: number) {
    this.router.navigate(['/update', id]);
    console.log('Update', id);
  }

    addEmployees() {
    this.router.navigate(['/add']);
  }

  // ============================================== OTHER METHODS ============================================== //

  getTotalEmployees() {
    this.getAllEmployees();
  }

  searchEmployees(): void {
    this.employeeService.searchEmployees(this.query).subscribe(
      (data: Employee[]) => {
        this.employees = data;
      },
      (error) => {
        console.log('Error getting Employees', error);
      }
    );
  }

  //   Search(): void {
  //   this.searchEmployees();
  // }



  // For filtering
  Search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}
