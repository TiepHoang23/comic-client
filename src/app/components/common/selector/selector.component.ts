import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.scss',
})
export class SelectorComponent {
  showFilterOption = false;
  options = [];
  @Input() _labelTitle = '';
  constructor() {}

  OnSelectorChange({ option, data }: { option: any; data: any }) {
    return;
  }
}
