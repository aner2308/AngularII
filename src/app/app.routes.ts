import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    //Min route till courses blir default
    {path: 'courses', component: CoursesComponent},
    {path: '', redirectTo: '/courses', pathMatch: 'full'},
    
    //Felmeddelande vid okänd route
    {path: '404', component: NotFoundComponent},
    {path:'**', component: NotFoundComponent}
];
