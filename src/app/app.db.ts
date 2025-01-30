import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';

export interface Employee {
  id?: number;
  name: string;
  designation: string;
  startDate?: Date | string;
  endDate?: Date | string;
}

@Injectable({
  providedIn: 'root'
})
export default class AppDB extends Dexie {
 employeeLists!: Table<Employee, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(3).stores({
        employeeLists: '++id',
    });
 
  }
}
