import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalApiService } from '../../services/external-api';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-external-data',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './external-data.html'
})
export class ExternalDataComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private externalService: ExternalApiService) {}

  ngOnInit(): void {
    // GET API 
    this.externalService.getUsers().subscribe((data: any) => {
      this.usuarios = data;
    });
  }
}