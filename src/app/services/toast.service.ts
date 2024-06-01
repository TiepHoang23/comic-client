// src/app/toast.service.ts
import { Injectable } from '@angular/core';

export enum ToastType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
}
interface Toast {
  id: number;
  type: ToastType
  message: string;
  state: 'enter' | 'leave'; // Add state property
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: Toast[] = [];
  private nextId = 0;

  show(type: ToastType, message: string): void {
    const id = this.nextId++;
    const toast: Toast = { id, message, type, state: 'enter' }; // Initialize with 'enter' state
    this.toasts.push(toast);
    setTimeout(() => this.startLeaveAnimation(toast), 10000); // Start leave animation after 5 seconds
  }

  startLeaveAnimation(toast: Toast): void {
    toast.state = 'leave';
    setTimeout(() => this.remove(toast), 300); // Remove toast after leave animation duration
  }

  remove(toast: Toast): void {
    this.toasts = this.toasts.filter((t) => t.id !== toast.id);
  }
}
