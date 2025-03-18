import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards';

const routes: Routes = [
  {
    path:'',
    children:[
    
      {
        path:'login',
        loadChildren:()=>import('./pages/login/login.module').then(m=>m.LoginModule)

      },
      {
        path:'register',
        loadChildren:()=>import('./pages/register/register.module').then(m=>m.RegisterModule)

      },
      {
        path:'forgetpassword',
        loadChildren:()=>import('./pages/forgetpassword/forgetpassword.module').then(m=>m.ForgetpasswordModule)

      },
      {
        path:'reactiveform',
        // canActivate:[authGuard],
        loadChildren:()=>import('./pages/reactive-form/reactive-form.module').then(m=>m.ReactiveFormModule)
      },
      {
        path:'task',
        loadChildren:()=>import('./pages/task/task.module').then(m=>m.TaskModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
