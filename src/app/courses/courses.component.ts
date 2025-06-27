import { Component } from '@angular/core';
import { CourseCardComponent } from "./course-card/course-card.component";

@Component({
  selector: 'app-courses',
  imports: [CourseCardComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {

}
