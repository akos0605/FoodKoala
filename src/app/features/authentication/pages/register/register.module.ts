import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from 'src/app/features/authentication/pages/register/register.component';
import { RegisterFormModule } from 'src/app/features/authentication/components/register-form/register-form.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, RegisterRoutingModule, RegisterFormModule],
  exports: [RegisterComponent],
})
export class RegisterModule {}
