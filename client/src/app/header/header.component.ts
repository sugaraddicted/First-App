import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() toggleActivityMenu: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  onToggleActivityMenu() {
    this.toggleActivityMenu.emit();
  }
}