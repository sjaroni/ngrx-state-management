import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { getLoggedUser } from '../auth/states/auth.selector';
import { toSignal } from '@angular/core/rxjs-interop';
import { logout } from '../auth/states/auth.actions';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private store = inject<Store<AppState>>(Store);

  readonly loggedUser = toSignal(this.store.select(getLoggedUser));

  onLogout() {
    this.store.dispatch(logout());
  }  
}
