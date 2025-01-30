import { Injectable, signal } from '@angular/core';
import AppDB, { Employee } from './app.db';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  title = signal('Employee List');
  constructor(private appDB: AppDB) {}

  addEmployee(employee: Employee) {
    return this.appDB.employeeLists.add(employee);
  }
  getEmployees() {
    return this.appDB.employeeLists.toArray();
  }

  getEmployeeCount() {
    return this.appDB.employeeLists.count();
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
 
