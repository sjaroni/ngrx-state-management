import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { customIncrement, toggleCustomInput } from '../states/counter.actions';
import { toSignal } from '@angular/core/rxjs-interop';
import { getToggle } from '../states/counter.selector';
import { AppState } from '../../store/app.state';
@Component({
  selector: 'app-custom-input',
  imports: [FormsModule],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.scss',
})
export class CustomInputComponent {
  private store = inject<Store<AppState>>(Store);
  
  customValue: number = 0;
  
  readonly showCustomInput = toSignal(this.store.select(getToggle), {
    initialValue: false,
  });

  onCustomValueButtonClicked() {
    this.store.dispatch(customIncrement({ value: +this.customValue }));
  }

  onToggleClicked() {
    this.store.dispatch(toggleCustomInput());
  }
}
