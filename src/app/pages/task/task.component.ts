import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  contactForm:any =  FormGroup;  // Updated variable name to match the template
  
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    // Initialize the form group with the correct variable name
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      image: [null, Validators.required]
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.contactForm.patchValue({ image: file });
    }
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.contactForm.get('name')?.value);
    formData.append('image', this.contactForm.get('image')?.value);

    this.http.post('http://localhost:3000/api/upload', formData)
      .subscribe(response => {
        console.log('Upload successful!', response);
      }, error => {
        console.error('Error uploading', error);
      });
  }
}
