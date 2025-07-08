import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { provideState } from '@ngrx/store';
import { coursesReducer } from './states/courses.reducer';
import { COURSES_STATE } from '../constants';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [    
    provideState(COURSES_STATE, coursesReducer), // <-- Lazy loaded reducer
  ],
  exports: [],
})
export class CoursesModule {}
