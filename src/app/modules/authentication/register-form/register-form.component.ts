import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AccountService } from '../../../dataSource/services/account.service';

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
    private accountService: AccountService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      "confirm-password": ['', Validators.required],
    });
  }



  ngOnDestroy(): void {

  }
  onSubmit() {
    console.log(this.form);
    if (!this.form.valid) return;

    let email = this.form.value.email
    let password = this.form.value.password
    let confirmPassword = this.form.value['confirm-password']
    if (password !== confirmPassword) return
    let name = this.form.value.name
    this.accountService.Register(name, email, password).pipe(first()).subscribe((res: any) => {

      if (res.status === 1) {
        this.router.navigate(['/'])
      }
    });
  }
}
