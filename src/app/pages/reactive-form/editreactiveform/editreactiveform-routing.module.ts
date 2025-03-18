import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditreactiveformComponent } from './editreactiveform.component';

const routes: Routes = [
  {
   path:'',
   component:EditreactiveformComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditreactiveformRoutingModule { }
