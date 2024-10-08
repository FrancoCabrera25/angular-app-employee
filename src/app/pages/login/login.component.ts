import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  public hide = signal(true);
  public errorLogin?: string;
  public form: FormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  isValidField(field: string): boolean | null {
    return (
      this.form.controls[field].errors && this.form.controls[field].touched
    );
  }
  getFieldError(field: string): string | null {
    if (!this.form.controls[field]) return null;

    const errors = this.form.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'minlength':
          return `Este campo requiere minimo ${errors['minlength'].requiredLength} caracteres`;
        case 'required':
          return 'Este campo es requerido';
        case 'email':
          return 'El email invalido';
      }
    }

    return null;
  }
  onSubmit(): void {
    if (this.form.valid) {
      const { email, password } = this.form.getRawValue();
      this.authService
        .login(email, password)
        .pipe()
        .subscribe({
          next: ({ user }) => {
            if (user.role === 'ADMIN') {
              this.router.navigate(['employee/list']);
            } else if (user.role === 'USER') {
              this.router.navigate(['employee/profile']);
            } else {
              console.log('no role');
            }
          },
          error: (error) => {
            this.errorLogin = error;
          },
        });
    }
  }
}
