import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../states/counter.actions';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-counter-button',
  imports: [],
  templateUrl: './counter-button.component.html',
  styleUrl: './counter-button.component.scss',
})
export class CounterButtonComponent {
  private store = inject<Store<AppState>>(Store);

  onIncrement() {    
    this.store.dispatch(increment());
  }

  onDecrement() {
    this.store.dispatch(decrement());
  }

  onReset() {
    this.store.dispatch(reset());
  }
}
