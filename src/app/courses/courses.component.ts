import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  courselist: Course[] = [];
  filteredCourses: Course[] = [];
  filterValue: string = "";
  sortingBy: string = "";

  constructor(private courseservice: CourseService) { }

  ngOnInit() {
    this.courseservice.getCourses().subscribe(data => {
      this.courselist = data;
      this.filteredCourses = data;
    })
  }

  applyFilter(): void {
    this.filteredCourses = this.courselist.filter((course) =>
      course.code.toLowerCase().includes(this.filterValue.toLowerCase()) ||
      course.coursename.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }

  sortBy(sort: string): void {
    if (this.sortingBy === sort) {
      this.filteredCourses.reverse();
    } else {
      this.sortingBy = sort;
      this.filteredCourses.sort((a, b) => {
        if (sort === "code") {
          return a.code.localeCompare(b.code);
        } else if (sort === "coursename") {
          return a.coursename.localeCompare(b.coursename);
        } else if (sort === "progression") {
          return a.progression.localeCompare(b.progression);
        }
        return 0;
      });
    }
  }
}
