import { Route } from "@angular/router";
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { CreateEmployeeComponent } from "./create-employee/create-employee.component";


export const EMPLOYEE_ROUTES: Route[] = [
    {path: 'list', component: EmployeeListComponent},
    {path: 'add', component: CreateEmployeeComponent},
    {path: 'edit/:id', component: CreateEmployeeComponent},
    { path: '',   redirectTo: '/employee/list', pathMatch: 'full' }  ];