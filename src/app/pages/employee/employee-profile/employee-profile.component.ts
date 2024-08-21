import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>profile works!</p>`,
  styleUrl: './employee-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EmployeeProfileComponent { }
