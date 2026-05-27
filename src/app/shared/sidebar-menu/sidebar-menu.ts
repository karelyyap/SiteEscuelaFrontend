import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenav,
    MatListModule,
    MatIconModule,
    MatButtonModule  
  ],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss'
})

export class SidebarMenu{


}