import { Injectable, signal } from '@angular/core';
import AppDB, { Employee } from './app.db';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  title = signal('Employee List');
  constructor(private appDB: AppDB) {}

  addEmployee(employee: Employee) {
    return this.appDB.employeeLists.add(employee);
  }

  getCurrentEmployees() {
    return this.appDB.employeeLists
      .filter(
        (employee) =>
          employee.endDate === '' || moment(employee.endDate).isSameOrAfter(moment().subtract(1, 'day'))
      )
      .toArray();
  }

  getPreviousEmployees() {
    return this.appDB.employeeLists
      .filter(
        (employee) =>
          employee.endDate !== '' && moment(employee.endDate).isSameOrBefore(moment().subtract(1, 'day'))
      )
      .toArray();
  }

  getEmployeeCount() {
    return this.appDB.employeeLists.count();
  }

  getPreviousEmployeeCount() {
    return this.appDB.employeeLists
      .filter(
        (employee) =>
          employee.endDate !== '' && moment(employee.endDate).isSameOrBefore(moment().subtract(1, 'day'))
      )
      .count();
  }

  getCurrentEmployeeCount() {
    return this.appDB.employeeLists
      .filter(
        (employee) =>
          employee.endDate === '' || moment(employee.endDate).isSameOrAfter(moment().subtract(1, 'day'))
      )
      .count();
  }

  getEmployee(id: number) {
    return this.appDB.employeeLists.get(id);
  }
  updateEmployee(employee: Employee) {
    return this.appDB.employeeLists.update(employee.id as number, employee);
  }
  deleteEmployee(id: number) {
    return this.appDB.employeeLists.delete(id);
  }
}
