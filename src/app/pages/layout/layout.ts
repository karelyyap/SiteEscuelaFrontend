import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarMenu } from '../../shared/sidebar-menu/sidebar-menu';
import { Header } from '../../shared/header/header';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, SidebarMenu, Header],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})

export class Layout {

}
