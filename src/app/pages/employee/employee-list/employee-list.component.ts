import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../shared/interfaces/employee.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { EmployeeFilterComponent } from '../employee-filter/employee-filter.component';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    EmployeeFilterComponent,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EmployeeListComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private dialog = inject(MatDialog);
  displayedColumns: string[] = [
    'name',
    'lastName',
    'email',
    'birthdate',
    'position',
    'actions',
  ];
  dataSource = signal<Employee[]>([]);
  totalPage = 0;

  pageIndex: number = 1;
  pageSize: number = 10;

  ngOnInit(): void {
    this.loadEmployee();
  }

  public loadEmployee(filterName = ''): void {
    this.employeeService
      .getListEmployee(this.pageIndex, this.pageSize, filterName)
      .subscribe({
        next: ({ employees, total }) => {
          this.dataSource.set(employees);
          this.totalPage = total;
        },
      });
  }

  public edit(employee: Employee): void {
    this.showDialog(employee);
  }

  public add(): void {
    this.showDialog();
  }

  public showDialog(data?: Employee): void {
    this.dialog
      .open(EmployeeFormComponent, {
        width: '700px',
        data,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) this.loadEmployee();
        },
      });
  }

  public searchByName(value: string): void {
    this.loadEmployee(value);
  }

  changePage({ pageIndex, pageSize }: PageEvent): void {
    this.pageIndex = pageIndex + 1;
    this.pageSize = pageSize;
    this.loadEmployee();
  }
}
