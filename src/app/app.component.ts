import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { LoaderComponent } from "./loader/loader.component";
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { toSignal } from '@angular/core/rxjs-interop';
import { getErrorMessage, getIsLoading } from './shared/shared.selector';
import { ToasterComponent } from "./toaster/toaster.component";
import { autoLogin } from './auth/states/auth.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, LoaderComponent, ToasterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ngrx-state-management';

  private store = inject<Store<AppState>>(Store);

  readonly showLoading = toSignal(this.store.select(getIsLoading));
  readonly errorMessage = toSignal(this.store.select(getErrorMessage));

  ngOnInit(): void {
    this.store.dispatch(autoLogin());
  }

}
