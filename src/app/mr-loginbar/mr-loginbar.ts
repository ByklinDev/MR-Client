import { Component, computed, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mr-loginbar',
  imports: [MatButtonModule, MatIconModule, MatMenuModule, RouterLink],
  templateUrl: './mr-loginbar.html',
  styleUrl: './mr-loginbar.css',
})
export class MrLoginbar {
  userPhotoSrc = signal<string>('user_icon.png');
  userFirstName = signal<string>('David');
  userSurname = signal<string>('Duchovny');
  userBarName = computed(() => this.userFirstName() + ' ' + this.userSurname());
  constructor() {}
}
