import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./components/authentication/register/register.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/authentication/login/login.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { AddEmployeeComponent } from "./components/add-employee/add-employee.component";
import { ViewEmployeeComponent } from "./components/view-employee/view-employee.component";
import { AuthGuard } from "./guards/auth.guard";
import { ErrorPageComponent } from "./components/error-page/error-page.component";
import { NgModule } from "@angular/core";
import { UpdateEmployeeComponent } from "./components/update-employee/update-employee.component";

export const routes: Routes = [
    {path: '', redirectTo:'login', pathMatch:'full'},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: 'navbar', component: NavbarComponent, canActivate: [AuthGuard]},
    {path: 'add', component: AddEmployeeComponent, canActivate: [AuthGuard]},
    {path: 'view/:id', component: ViewEmployeeComponent, canActivateChild: [AuthGuard]},
    {path: 'error', component: ErrorPageComponent,},
    {path: 'update/:id', component: UpdateEmployeeComponent}
];


// @NgModule({
//     imports: [RouterModule.forRoot(routes)],
//     exports: [RouterModule]
// })

// export class AppRoutingModule{}