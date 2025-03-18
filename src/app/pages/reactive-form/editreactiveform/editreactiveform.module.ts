import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditreactiveformRoutingModule } from './editreactiveform-routing.module';
import { EditreactiveformComponent } from './editreactiveform.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditreactiveformComponent
  ],
  imports: [
    CommonModule,
    EditreactiveformRoutingModule,
    ReactiveFormsModule

  ]
})
export class EditreactiveformModule { }
