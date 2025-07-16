import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { provideEffects } from '@ngrx/effects';
import { AuthEffect } from './states/auth.effects';

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
    // provideState(AUTH_STATE, authReducer), // <-- Lazy loaded reducer
    provideEffects(AuthEffect)
  ],
  exports: [],
})
export class AuthModule {}
