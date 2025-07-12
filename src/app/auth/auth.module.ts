import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { provideState } from '@ngrx/store';
import { AUTH_STATE } from '../constants';
import { authReducer } from './states/auth.reducer';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes)],
  providers: [
    provideState(AUTH_STATE, authReducer), // <-- Lazy loaded reducer
  ],
  exports: [],
})
export class AuthModule {}
