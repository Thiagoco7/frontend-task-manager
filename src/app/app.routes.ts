import { Routes } from '@angular/router';
import { TaskList } from './components/task-list/task-list';
import { ExternalDataComponent } from './components/external-data/external-data';

export const routes: Routes = [
  { path: 'tasks', component: TaskList },
  { path: 'external', component: ExternalDataComponent },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }
];