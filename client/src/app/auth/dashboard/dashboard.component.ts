import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  profileForm: FormGroup;
  submitted: boolean;

  constructor(
    private fb: FormBuilder
  ) { 
    this.inItForm();
  }

  ngOnInit(): void {
    
  }

  inItForm(): void {
    this.profileForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: [''],
      city: [''],
      state: [''],
      postalCode: [''],
      old_password: [],
      password: [],
      cnf_password: []
    })
  }

  get formControls() {
    return this.profileForm.controls;
  }

  saveProfile(): void {
    this.submitted = true;
    if(this.profileForm.valid) {

    }
  }

}
