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
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
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
  indexPage = 1;
  pageSize = 10;

  ngOnInit(): void {
    this.employeeService.getListEmployee().subscribe({
      next: ({ employees, total, page }) => {
        this.dataSource.set(employees);
        this.totalPage = total;
        this.indexPage = page;
      },
    });
  }

  public onAddEmployee(): void {
    this.dialog.open(EmployeeFormComponent, {
      width: '600px',
    });
  }
}
