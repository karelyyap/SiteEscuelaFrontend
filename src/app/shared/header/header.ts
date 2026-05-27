import { SlicePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AutService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbar, MatMenu, MatMenuModule, MatButtonModule, MatIconModule, SlicePipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})

export class Header {
  protected readonly auth = inject(AutService);
  private readonly router = inject(Router);

  logout() : void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

