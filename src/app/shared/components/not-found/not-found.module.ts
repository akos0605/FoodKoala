import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from 'src/app/shared/components/not-found/not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, NotFoundRoutingModule],
  exports: [NotFoundComponent],
})
export class NotFoundModule {}
