import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
// import { Observable } from 'rxjs';
// import { User } from '../models/user.model';
import { getLoggedUser } from '../auth/states/auth.selector';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private store = inject<Store<AppState>>(Store);

  // loggedUser$: Observable<User> | undefined;
readonly loggedUser = toSignal(this.store.select(getLoggedUser));
}
