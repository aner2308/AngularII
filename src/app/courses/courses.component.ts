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

  //Hämtar kurser vid inladdning av sidan
  ngOnInit() {
    this.courseservice.getCourses().subscribe(data => {
      this.courselist = data;
      this.filteredCourses = data;
    })
  }

  //Jämför hämtade kursernas kursnamn/kurskod med texten i sökrutan
  applyFilter(): void {
    this.filteredCourses = this.courselist.filter((course) =>
      course.code.toLowerCase().includes(this.filterValue.toLowerCase()) ||
      course.coursename.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }

  //Sorterar kurserna vid klick på rubrik. Ger sortingBy värdet av den klickade rubriken. 
  sortBy(sort: string): void {

    //Om sortingBy matchar rubriken kommer den att vända ordning på sorteringen
    if (this.sortingBy === sort) {
      this.filteredCourses.reverse();
    } else {

      //Om sortingBy inte matckar den klickade rubriken sorterar den i fallande ordning.
      //SortingBy får också värdet av rubriken.
      this.sortingBy = sort;
      this.filteredCourses.sort((a, b) => {
        if (sort === "code") {
          return a.code.localeCompare(b.code);
        } else if (sort === "coursename") {
          return a.coursename.localeCompare(b.coursename);
        } else if (sort === "progression") {
          return a.progression.localeCompare(b.progression);
        }

        //Om det skulle bli något knas returneras 0 istälet för null.
        return 0;
      });
    }
  }
}
