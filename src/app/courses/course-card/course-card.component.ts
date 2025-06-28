import { Component, Input } from '@angular/core';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-card',
  imports: [],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.scss'
})
export class CourseCardComponent {
  @Input() course: Course | null = null;
}
