import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';
import { MrLoginbar } from "./mr-loginbar/mr-loginbar";
import { MrNavbar } from "./mr-navbar/mr-navbar";
import { MrFooter } from './mr-footer/mr-footer';
import { MrAuthService } from './services/mr-auth-service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatIconModule, MatButtonModule, MrLoginbar, MrNavbar, MrFooter],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'mr';  
}
