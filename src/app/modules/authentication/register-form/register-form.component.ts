import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@services/account.service';
import { ToastService, ToastType } from '@services/toast.service';
import { validate } from 'numeral';
import { first } from 'rxjs';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  form!: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private router: Router, // private authService: AuthService
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private toast: ToastService,
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      'confirm-password': ['', Validators.required],
      accept: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {}
  onSubmit() {
    if (!this.form.valid) {
      this.submitted = true;
      return;
    }

    let email = this.form.value.email;
    let password = this.form.value.password;
    let confirmPassword = this.form.value['confirm-password'];
    if (password !== confirmPassword) {
      this.toast.show(ToastType.Error, 'Mật khẩu xác nhận không đúng');
      return;
    }
    let name = this.form.value.name;
    this.accountService
      .Register(name, email, password)
      .pipe(first())
      .subscribe((res: any) => {
        if (res.status === 1) {
          this.submitted = false;
          this.toast.show(ToastType.Success, res.message);
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1000);
        } else {
          this.toast.show(ToastType.Error, res.message);
        }
      });
  }
}
