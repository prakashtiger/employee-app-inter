import { Component, inject } from '@angular/core';
import { EmployeeService } from '../employee.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import AppDB, { Employee } from '../app.db';
import { CommonModule } from '@angular/common';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatMomentDateModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    FooterComponent,
  ],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['YYYY-MM-DD'],
        },
        display: {
          dateInput: 'DD MMM YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
  ],
})
export class CreateEmployeeComponent {
  employeeForm!: FormGroup;
  destignationList = [
    'Product Designer',
    'Flutter Developer',
    'QA Tester',
    'QA Tester',
  ];
  private employeeService = inject(EmployeeService);
  private route = inject(ActivatedRoute);
  maxDate = moment().toDate();
  constructor(private fb: FormBuilder, private router: Router) {
    this.employeeService.title.set('Add Employee');
    this.formInit();
    this.route.params
      .pipe(
        map((params) => params['id']),
        filter((id) => !!id),
        tap((_) => this.employeeService.title.set('Edit Employee Details')),
        switchMap((id) => from(this.employeeService.getEmployee(parseInt(id))))
      )
      .subscribe((employee) => {
        this.formInit(employee);
      });
  }

  formInit(formData: Employee | null = null) {
    this.employeeForm = this.fb.group({
      name: [formData?.name || '', Validators.required],
      designation: [formData?.designation || '', Validators.required],
      startDate: [formData?.startDate || '', Validators.required],
      endDate: [formData?.endDate || ''],
      id: [formData?.id || null],
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const formValue = {
        ...this.employeeForm.value,
        startDate: moment.isDate(this.employeeForm.value.startDate)
          ? this.employeeForm.value.startDate
          : this.employeeForm.value.startDate.toDate(),
        endDate: moment.isDate(this.employeeForm.value.endDate)
          ? this.employeeForm.value.endDate
          : this.employeeForm.value.endDate.toDate(),
      };
      if (formValue.id) {
        this.employeeService.updateEmployee(formValue).then(() => {
          this.router.navigateByUrl('/employee/list');
        });
      } else {
        delete formValue.id;
        this.employeeService.addEmployee(formValue).then(() => {
          this.router.navigateByUrl('/employee/list');
        });
      }
    }
  }
}
