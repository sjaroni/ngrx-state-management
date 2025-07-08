import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './counter.component';
import { provideState } from '@ngrx/store';
import { counterReducer } from './states/counter.reducer';
import { COUNTER_STATE } from '../constants';

const routes: Routes = [
  {
    path: '',
    component: CounterComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [  
  CommonModule,
    RouterModule.forChild(routes),
    CounterComponent
  ],
  providers: [
    provideState(COUNTER_STATE, counterReducer), // <-- Lazy loaded reducer
  ],
  exports: [],
})
export class CounterModule {}
