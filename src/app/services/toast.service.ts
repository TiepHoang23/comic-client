// src/app/toast.service.ts
import { Injectable } from '@angular/core';

interface Toast {
  id: number;
  title: string;
  message: string;
  state: 'enter' | 'leave'; // Add state property
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: Toast[] = [];
  private nextId = 0;

  show(title: string, message: string): void {
    const id = this.nextId++;
    const toast: Toast = { id, title, message, state: 'enter' }; // Initialize with 'enter' state
    this.toasts.push(toast);
    setTimeout(() => this.startLeaveAnimation(toast), 3000); // Start leave animation after 5 seconds
  }

  startLeaveAnimation(toast: Toast): void {
    toast.state = 'leave';
    setTimeout(() => this.remove(toast), 300); // Remove toast after leave animation duration
  }

  remove(toast: Toast): void {
    this.toasts = this.toasts.filter((t) => t.id !== toast.id);
  }
}
