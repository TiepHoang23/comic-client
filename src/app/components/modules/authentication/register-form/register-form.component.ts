import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { AccountService } from '../../../../dataSource/services/account.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {

  form!: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private router: Router, // private authService: AuthService
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {
    this.form = this.formBuilder.group({
      "name": ['', Validators.required],
      "email": ['', Validators.required],
      "password": ['', Validators.required],
      "confirm-password": ['', Validators.required],
    });
  }



  ngOnDestroy(): void {

  }
  onSubmit() {
    if (!this.form.valid) return;

    let email = this.form.value.email
    let password = this.form.value.password
    
    console.log(email, password);
    
  }
}
