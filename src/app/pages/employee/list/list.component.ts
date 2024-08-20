import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../shared/interfaces/employee.interface';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  displayedColumns: string[] = ['name', 'lastName', 'email', 'birthdate', 'position'];
  dataSource = signal<Employee[]>([]);

  ngOnInit(): void {
    this.employeeService.getListEmployee().subscribe({
      next: ({ employees }) => {
        this.dataSource.set(employees);
      },
    });
  }
}
