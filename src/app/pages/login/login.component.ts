import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { RegistrationformService } from 'src/app/services/registrationform.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  contactForm:any=FormGroup;
  submitted = false;
  // loginformServices: any;
 constructor(private route:ActivatedRoute,private router:Router,private loginformServices:RegistrationformService,private toastr:ToastrService){}
  ngOnInit():void{
    this.contactForm = new FormGroup({
      
      'email' : new FormControl(null,[Validators.required,Validators.email]),
      'Password' :new FormControl(null,Validators.required),
    
    }) 

 }
 onsubmit(){
  this.submitted = false;
  if(this.contactForm.valid){
    console.log(this.contactForm.value);
  const formData = this.contactForm.value;
  this.loginformServices.loginformdata(formData)
 .subscribe( {
  next: (pres) => {
   this.toastr.success('customer login sucess');
  this.router.navigate(['/reactiveform'])
  


 },
 error: (perror) => {
  
  this.toastr.error(perror.error.errors[0]['msg']);
 }
});



  }else{
    this.toastr.error('perror.error.errors[0][msg]');
    this.submitted = true;
     console.log(this.submitted);
  }


}
}



