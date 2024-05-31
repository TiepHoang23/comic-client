// src/app/toast/toast.component.ts
import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('toastAnimation', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'translateY(100%)',
        })
      ),
      state(
        'enter',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        })
      ),
      state(
        'leave',
        style({
          opacity: 0,
          height: 0,
        })
      ),
      transition('void => enter', [animate('300ms ease-in')]),
      transition('enter => leave', [animate('300ms ease-out')]),
    ]),
  ],
})
export class ToastComponent implements OnInit {
  constructor(public toastService: ToastService) {}

  ngOnInit(): void {}
}
