import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalApiService } from '../../services/external-api';
import { MatCardModule } from '@angular/material/card';
import { ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-external-data',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatIconModule],
  templateUrl: './external-data.html'
})
export class ExternalDataComponent implements OnInit {
  usuarios: any[] = [];

  constructor(
    private externalService: ExternalApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void { 
      this.externalService.getUsers().subscribe((data: any) => {
      this.usuarios = data;
      this.cdr.detectChanges();
    });
  }
}