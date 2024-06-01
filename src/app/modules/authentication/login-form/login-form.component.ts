import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { tap, delay, finalize, catchError, first } from 'rxjs/operators';
import { AccountService } from '@services/account.service';
// import { of, Subscription } from 'rxjs';

// import { json } from 'stream/consumers';

// import { AuthService } from '@core/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnDestroy {

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
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }



  ngOnDestroy(): void {

  }
  onSubmit() {
    if (!this.form.valid) return;

    let email = this.form.value.email
    let password = this.form.value.password
    this.accountService.Login(email, password).pipe(first()).subscribe((res: any) => {
      if (res.status === 1) {
        localStorage.setItem("auth", JSON.stringify(res.data))
        this.router.navigate(['/'])
      }

    })

  }

}
