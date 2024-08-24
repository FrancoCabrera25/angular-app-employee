import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-employee-filter',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  template: `<mat-form-field appearance="outline">
    <mat-label>Buscar por nombre</mat-label>
    <input matInput [formControl]="inputControl" />
  </mat-form-field>`,
  styleUrl: './employee-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeFilterComponent implements OnInit {
  public inputControl = new FormControl();
  @Output() search = new EventEmitter<string>();

  ngOnInit(): void {
    this.inputControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value: string) => {
        this.search.emit(value);
      });
  }
}
