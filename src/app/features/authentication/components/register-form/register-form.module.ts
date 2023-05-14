import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RegisterFormComponent } from 'src/app/features/authentication/components/register-form/register-form.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RegisterFormComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    RouterModule,
  ],
  exports: [RegisterFormComponent],
})
export class RegisterFormModule {}
