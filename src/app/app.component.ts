import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'comic-client';

  constructor() { }

  ngOnInit(): void {
    // if (localStorage.getItem("comics") === null) {
    //   localStorage.setItem("comics", JSON.stringify([]))
    // }
  }
}
