import { Component } from '@angular/core';
import { CounterValueComponent } from "./counter-value/counter-value.component";
import { CounterButtonComponent } from "./counter-button/counter-button.component";

@Component({
  selector: 'app-counter',
  imports: [CounterValueComponent, CounterButtonComponent],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {

}
