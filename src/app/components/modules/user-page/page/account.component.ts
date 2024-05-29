import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';



@Component({
  selector: 'account-component',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class UserPageComponent {

  avatar: string = "https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg";
  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      // do whatever you want with the file
      console.log(file);
      const reader = new FileReader();
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = (e: any) => {
          this.avatar = e.target.result;
        };
      }

    }
  }

}
