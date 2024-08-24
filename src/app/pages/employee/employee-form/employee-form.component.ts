import { CommonModule, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../shared/interfaces/employee.interface';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private datePipe = inject(DatePipe);
  private employeeService = inject(EmployeeService);
  private dialogRef = inject(MatDialogRef<EmployeeFormComponent>);
  private data = inject<Employee>(MAT_DIALOG_DATA);
  public jobsPositionsList: string[] = [];
  public title: 'Crear empleado' | 'Editar empleado' = 'Crear empleado';

  public actionEditing = signal<boolean>(false);

  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    birthdate: ['', [Validators.required]],
    position: ['', [, Validators.required]],
    active: [true, [Validators.required]],
  });

  ngOnInit(): void {
    this.loadListJobsPositions();
    if (this.data) {
      this.form.reset(this.data);
      this.title = 'Editar empleado';
      this.actionEditing.set(true);
    }
  }

  private loadListJobsPositions(): void {
    this.employeeService.getListJobsPositions().subscribe({
      next: (result) => {
        this.jobsPositionsList = result;
      },
    });
  }
  public onSubmit(): void {
    if (this.form.valid) {
      const formValues = this.form.getRawValue() as Employee;
      const birthdateFormatted = this.datePipe.transform(
        formValues.birthdate,
        'dd/MM/YYYY'
      );
      const employee = {
        ...formValues,
        birthdate: birthdateFormatted,
      } as Employee;
      if (this.actionEditing()) {
        this.employeeService.update(this.data.id, employee).subscribe((result) => {
          this.dialogRef.close(true);
        });
      } else {
        this.employeeService.create(employee).subscribe((result) => {
          this.dialogRef.close(true);
        });
      }
    }
  }
}
