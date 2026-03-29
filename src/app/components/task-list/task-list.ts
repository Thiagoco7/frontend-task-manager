import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form';
import { TaskService, Task } from '../../services/task';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';

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
export class TaskList implements OnInit {
  // VARIABLES
  tasks: Task[] = [];
  displayedColumns: string[] = ['titulo', 'descripcion', 'estado', 'fecha', 'acciones'];

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarTareas(); // Llamamos a la carga inicial
  }

  // Función para mostrar mensajes rápidos
  mostrarMensaje(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  cargarTareas() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar tareas', err);
        this.mostrarMensaje('Error al conectar con el servidor');
      }
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
          this.cargarTareas();
          this.mostrarMensaje('Tarea actualizada con éxito');
        } else {
          this.taskService.createTask(result).subscribe(() => this.cargarTareas());
          this.mostrarMensaje('Tarea creada correctamente');
        }
      }
    });
  }

  eliminarTarea(id: number) {
    if (confirm('¿Estás seguro de eliminar esta tarea?')) {
      this.taskService.deleteTask(id).subscribe(() => this.cargarTareas());
      this.mostrarMensaje('Tarea eliminada');
    }
  }

  getBadgeColor(estado: string): string {
    const st = estado ? estado.toLowerCase().trim() : '';

    switch (st) {
      case 'completada': return 'primary';  
      case 'en progreso': return 'tertiary'; 
      case 'pendiente': return 'error';
      default: return '';
    }
  }
}