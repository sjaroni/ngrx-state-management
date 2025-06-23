import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-counter-value',
  imports: [],
  templateUrl: './counter-value.component.html',
  styleUrl: './counter-value.component.scss'
})
export class CounterValueComponent {
  @Input()
  count: number = 0;
}
