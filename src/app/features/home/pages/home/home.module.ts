import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from 'src/app/features/home/pages/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { NgLetModule } from 'ng-let';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, MatButtonModule, NgLetModule],
  exports: [HomeComponent],
})
export class HomeModule {}
