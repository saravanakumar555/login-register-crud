import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegistrationformService } from 'src/app/services/registrationform.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  contactForm:any=FormGroup;
  submitted = false;

 constructor(private route:ActivatedRoute,
   private registerformService:RegistrationformService,private toastr:ToastrService){}

   

  ngOnInit():void{
    this.contactForm = new FormGroup({
      'firstName' : new FormControl(null,Validators.required),
      'lastName' : new FormControl(null,Validators.required),
      'email' : new FormControl(null,[Validators.required,Validators.email]),
      'Password' :new FormControl(null,Validators.required),
      'ConformPassword':new FormControl(null,Validators.required),
    }) 

 }

 onsubmit(){
  this.submitted = false;
  if(this.contactForm.valid){
    console.log(this.contactForm.value);

 const formData = this.contactForm.value;
 this.registerformService.addregisterformdata(formData)
 .subscribe( {
  next: (pres) => {
   this.toastr.success(pres.success[0]['msg']);
  


 },
 error: (perror) => {
  
  this.toastr.error(perror.error.errors[0]['msg']);
 }
});



  }else{
    this.submitted = true;
    console.log(this.submitted);
  }


}
}
  