import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form';
import { TaskService, Task } from '../../services/task'; 
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule, 
    MatDialogModule, 
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    MatChipsModule
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList implements OnInit { // OnInit es para ejecutar código al iniciar
  
  // VARIABLES
  tasks: Task[] = []; 
  displayedColumns: string[] = ['titulo', 'descripcion', 'estado', 'fecha', 'acciones'];

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cargarTareas(); // Llamamos a la carga inicial
  }

  cargarTareas() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (err) => console.error('Error al cargar tareas', err)
    });
  }

  abrirFormulario(task?: Task) {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '400px',
      data: task 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (task && task.id) {
          this.taskService.updateTask(task.id, result).subscribe(() => this.cargarTareas());
        } else {
          this.taskService.createTask(result).subscribe(() => this.cargarTareas());
        }
      }
    });
  }

  eliminarTarea(id: number) {
    if (confirm('¿Estás seguro de eliminar esta tarea?')) {
      this.taskService.deleteTask(id).subscribe(() => this.cargarTareas());
    }
  }

  getBadgeColor(estado: string) {
    switch (estado) {
      case 'completada': return 'primary';
      case 'en progreso': return 'accent';
      default: return 'warn';
    }
  }
}