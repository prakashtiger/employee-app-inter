import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import AppDB from './app.db';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
   providers: [EmployeeService, AppDB]
})
export class AppComponent {
  title!: string;
  private empService = inject(EmployeeService);
  constructor() {    
    effect(() => {
      console.log('title changed');
      this.title = this.empService.title();
    });
  }
}
