import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { LoaderComponent } from "./loader/loader.component";
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { toSignal } from '@angular/core/rxjs-interop';
import { getErrorMessage, getIsLoading } from './shared/shared.selector';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ngrx-state-management';

  private store = inject<Store<AppState>>(Store);

  readonly showLoading = toSignal(this.store.select(getIsLoading));
  readonly errorMessage = toSignal(this.store.select(getErrorMessage));

}
