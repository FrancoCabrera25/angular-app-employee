import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="employee-container">
      <router-outlet />
    </div>
  `,
  styleUrl: './employee.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EmployeeComponent {}
