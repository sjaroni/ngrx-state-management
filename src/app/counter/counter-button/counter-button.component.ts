import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-counter-button',
  imports: [],
  templateUrl: './counter-button.component.html',
  styleUrl: './counter-button.component.scss'
})
export class CounterButtonComponent {

  @Output()
  incrementClicked: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  decrementClicked: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  resetClicked: EventEmitter<void> = new EventEmitter<void>();

  increment(){
    this.incrementClicked.emit();
  }

  decrement() {
    this.decrementClicked.emit();
  }
  
  reset() {
    this.resetClicked.emit();
  }
}
