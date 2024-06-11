import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '@services/account.service';
import { ImageService } from '@services/image.service';
import { ToastService, ToastType } from '@services/toast.service';
import { first } from 'rxjs';
import { IUser } from 'src/app/dataSource/schema/User';

@Component({
  selector: 'account-component',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class UserPageComponent implements OnInit {
  user!: IUser;
  avatar: string = "https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg";
  avatarTimestamp!: number;
  infoForm: FormGroup = new FormGroup({
    firstName: new FormControl(this.user?.firstName, Validators.required),
    lastName: new FormControl(this.user?.lastName, Validators.required),
    email: new FormControl(this.user?.email, [Validators.required, Validators.email]),
    dob: new FormControl(this.user?.dob, Validators.required),
  });
  passwordForm: FormGroup = new FormGroup({
    oldPassword: new FormControl(this.user?.firstName, Validators.required),
    newPassword: new FormControl(this.user?.lastName, Validators.required,),
    rePassword: new FormControl(this.user?.lastName, Validators.required)

  })

  submitFailed = false;
  constructor(private accountService: AccountService,
    private toast: ToastService,
    private elementRef: ElementRef,
    private imageService: ImageService) {


  }


  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: any): void {
    let formsElement = this.elementRef.nativeElement.querySelectorAll('form');
    let formInfoElement, formPasswordElement;
    formInfoElement = formsElement[0];
    formPasswordElement = formsElement[1];

    if (!formInfoElement.contains(event.target)) {
      this.infoForm.reset(this.user)

    }
  }

  ngOnInit() {


    this.accountService.GetUserInfor().subscribe((res: any) => {
      if (res.status) {
        this.user = res.data;
        this.avatar = this.user?.avatar ? this.user?.avatar : this.avatar;
        this.avatar = this.accountService.addTimestampToUrl(this.avatar);
        this.user.dob = this.formatDateToISO(this.user.dob);
        this.updateInfoForm();

      } else {
        console.error(res.message);
      }
    });
  }
  updateInfoForm() {
    this.infoForm.setValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      dob: this.user.dob,
    });
  }
  formatDateToISO(isoDate: string | undefined): string {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const reader = new FileReader();
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        console.log(file);

        const avatar: FormData = new FormData();
        avatar.append('image', file, file.name);
        this.accountService.UpdateAvatar(avatar).pipe(first()).subscribe((res: any) => {
          if (res.status == 200) {

            this.avatar = res.data
            this.user.token = this.accountService.getAuthorizationToken()
            this.imageService.updateImageUrl(this.avatar);
            this.accountService.SaveUser(this.user)
            this.toast.show(ToastType.Success, res.message);

          } else {
            this.toast.show(ToastType.Error, res.message);

          }
        });
      }
    }
  }
  markFormAsUpdated(formGroup: FormGroup) {
    formGroup.markAsPristine();
    formGroup.markAsUntouched();
    formGroup.updateValueAndValidity();
  }
  onDateChange(event: any) {
    const input = event.target.value; // Format: yyyy-MM-dd
    const date = new Date(input);
    if (!isNaN(date.getTime())) {
      this.user!.dob = date.toISOString(); // Update the user Dob in ISO format
    } else {
      console.error('Invalid date');
    }
  }
  onUpdateInfo() {
    let userinfortoUpdate = this.infoForm.value;
    for (let key in userinfortoUpdate) {
      if (userinfortoUpdate.hasOwnProperty(key) && typeof userinfortoUpdate[key] === 'string') {
        userinfortoUpdate[key] = userinfortoUpdate[key].trim().replace(/\s+/g, ' ');
      }
    }

    userinfortoUpdate.dob = new Date(userinfortoUpdate.dob).toISOString();

    this.accountService.UpdateInfo(userinfortoUpdate).pipe(first()).subscribe((res: any) => {
      if (res.status == 200) {
        //Cập nhật lại user 
        this.user = res.data
        this.user.dob = this.formatDateToISO(this.user.dob);
        this.markFormAsUpdated(this.infoForm)
        this.toast.show(ToastType.Success, res.message);
      } else {
        this.toast.show(ToastType.Error, res.message);
      }
    });
  }
  onUpdatePassword() {
    if (this.passwordForm.invalid) {

      this.submitFailed = true;
      this.markFormAsUpdated(this.passwordForm)
    }
    else {
      this.submitFailed = false;
      let updatepassword = this.passwordForm.value
      this.accountService.UpdatePassword(updatepassword).pipe(first()).subscribe((res: any) => {
        if (res.status == 200) {
          this.markFormAsUpdated(this.passwordForm)
          this.toast.show(ToastType.Success, res.message);
        } else {
          this.toast.show(ToastType.Error, res.message);
        }
      });
    }
  }
}
