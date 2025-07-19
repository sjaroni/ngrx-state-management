import { Component, Input, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { setErrorMessage } from '../shared/shared.actions';

@Component({
  selector: 'app-toaster',
  imports: [],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss',
})
export class ToasterComponent implements OnInit {
  @Input() errorMessage: string = '';
  private store = inject<Store<AppState>>(Store);

  ngOnInit(): void {
    setTimeout(() => {
      this.store.dispatch(setErrorMessage({ message: ''}))
    }, 5000)
  }
}
