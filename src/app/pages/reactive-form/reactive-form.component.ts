import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import jwt_decode from 'jwt-decode'
import { Router } from '@angular/router';
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent {
  accessTokenData: any = localStorage.getItem("Admin");
  accessTokenObj: any = JSON.parse(this.accessTokenData);
  token: any = this.accessTokenObj.token;
   submitted = false;
   contactForm:any=FormGroup;

  
  
  formarraydata:any = [];
  formlistdata: any=[];
  firstname: any;
 lastname: any;
  email: any;
  phone: any;
  address :any;
  type: any = 'add';
  updateid: any;
  userName: any;
  constructor(private reactiveformService:ReactiveFormService,private router: Router,
    private toastr:ToastrService
    ){}
  ngOnInit(){ 
    
    this.contactForm = new FormGroup({
      'firstName' : new FormControl(null,Validators.required),
      'lastName' : new FormControl(null,Validators.required),
      'email' : new FormControl(null,[Validators.required,Validators.email]),
      'phone' : new FormControl(null,Validators.required),
      'address' : new FormControl(null,Validators.required),
      // 'image' : new FormControl(null,Validators.required),
    })

     this.getReactiveformdata()
    console.log(this.token)
    const tokenInfo = this.getDecodedAccessToken(this.token);
    this.userName=tokenInfo.firstName +''+tokenInfo.lastName;
    this.email=tokenInfo.email;
    console.log(this.userName)

  }
  

  getReactiveformdata(){
    this.reactiveformService.getReactiveformdata()
     .subscribe({
      next: (pres) => {
        console.log(pres.data)
       this.formlistdata = pres.data;
     },
     error: (perror) => {
     
      this.toastr.success(perror.error.errors[0]['msg']);
     }
    });
  }

  // onFileSelect(event:any){
 
  //   const file = event.target.files;
  //   console.log('file:',file)
  // }

 

  onsubmit(){
    this.submitted=false;
    if(this.contactForm.valid){
      const formData = this.contactForm.value;
      console.log('1111',formData)
      const methodtype={
        'type':this.type,
        'id':this.updateid

      }
      const mergedata = Object.assign(formData,methodtype);
     this.reactiveformService.addReactiveformdata(mergedata)
     .subscribe({
      next: (pres) => {
      this.toastr.success(pres.success[0]['msg']);
      this.contactForm.reset();
       this.getReactiveformdata();
       this.type = 'add';

     },
     error: (perror) => {
      
      this.toastr.error(perror.error.errors[0]['msg']);
     }
    });

    } else{

       this.submitted = true;
    }
  }

 

  deleteUser(id:any){
    console.log(id)
    const formdata={'id':id}
    this.reactiveformService.delete(formdata) 
    .subscribe({
      next: (pres) => {
      this.toastr.success(pres.success[0]['msg']);
      
       this.getReactiveformdata();

     },
     error: (perror) => {
      
      this.toastr.success(perror.error.errors[0]['msg']);
     }
    });
  }

  editUser(id:any,firstName:any,lastName:any,email:any,phone:any,type:any){
    console.log(id,firstName,lastName,email,phone,type)
    this.updateid=id;
  
    this.type=type;
    this.contactForm.setValue({
  
      'firstName' :firstName,
        'lastName' : lastName,
        'email' : email,
        'phone' : phone
  
  
    })
  
  }

  getDecodedAccessToken(tokenInfo: string): any {
    try {
      return jwt_decode(tokenInfo);
    } catch(Error) {
      return null;
    }
  }


  logout(){
    localStorage.removeItem("Admin");
    this.router.navigate(['/login']);
  }
}
