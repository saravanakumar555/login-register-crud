import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';

@Component({
  selector: 'app-editreactiveform',
  templateUrl: './editreactiveform.component.html',
  styleUrls: ['./editreactiveform.component.css']
})
export class EditreactiveformComponent {
  Id: any;
  contactForm:any=FormGroup;
  submitted = false;

  constructor(private route:ActivatedRoute,private reactiveformService:ReactiveFormService,
    private toastr:ToastrService
    ){}

  ngOnInit():void{
this.Id = this.route.snapshot.queryParamMap.get('Id');
console.log(this.Id);

this.contactForm = new FormGroup({
  'firstName' : new FormControl(null,Validators.required),
  'lastName' : new FormControl(null,Validators.required),
  'email' : new FormControl(null,[Validators.required,Validators.email]),
  'phone' : new FormControl(null,Validators.required),
  'address' : new FormControl(null,Validators.required),
  'gender' : new FormControl(null,Validators.required)
})
this.getuserdetails();
  }

  
  getuserdetails(){
    this.reactiveformService.getuserdetails(this.Id)
     .subscribe({
      next: (pres) => {
        console.log(pres.data)

        this.contactForm.setValue({
          'firstName' :pres.data.First_name,
          'lastName': pres.data.Last_Name,
           'email': pres.data.email,
           'phone' : pres.data.phone,
           'address' : pres.data.address,
          'gender' : pres.data.Gender
          
        })

     },
     error: (perror) => {
     }
    });
  }

  onsubmit(){
    this.submitted = false;
   if(this.contactForm.valid){
    
    console.log(this.contactForm.value);
    const formData = this.contactForm.value;
    const userid={
      'id':this.Id

    }
    const mergedata = Object.assign(formData,userid);
    console.log(mergedata);
    this.reactiveformService.updateReactiveformdata(mergedata)
    .subscribe( {
     next: (pres) => {
      this.toastr.success(pres.success[0]['msg']);
      location.replace('/reactiveform')


    },
    error: (perror) => {
     
     this.toastr.error(perror.error.errors[0]['msg']);
    }
   });

   }else{
    this.submitted = true;
   }
  }
   
}
