import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCounter } from '../states/counter.selector';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-counter-value',
  imports: [],
  templateUrl: './counter-value.component.html',
  styleUrl: './counter-value.component.scss',
})
export class CounterValueComponent{
  private store = inject(Store);

  // 🔁 wandelt Observable in Signal
  readonly counter = toSignal(this.store.select(getCounter), { initialValue: 0 });
}

