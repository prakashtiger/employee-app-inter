import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { liveQuery } from 'dexie';
import { EmployeeService } from '../employee.service';
import {MatCardModule} from '@angular/material/card';
import { MomentDatePipe } from '../moment-date.pipe';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MomentDatePipe, MatButtonModule, RouterModule, FooterComponent, MatIconModule]
})
export class EmployeeListComponent {
    currentEmployeeLists$ = liveQuery(() => this.employeeService.getCurrentEmployees())
    previousEmployeeLists$ = liveQuery(() => this.employeeService.getPreviousEmployees())
    employeeListCount$ = liveQuery(() => this.employeeService.getEmployeeCount())
    currentEmployeeListCount$ = liveQuery(() => this.employeeService.getCurrentEmployeeCount())
    previousEmployeeListCount$ = liveQuery(() => this.employeeService.getPreviousEmployeeCount())
    constructor(private employeeService: EmployeeService) {
      this.employeeService.title.set('Employee List');
    }
    deleteEmployee(id: number) {
      this.employeeService.deleteEmployee(id);
    }
  }
