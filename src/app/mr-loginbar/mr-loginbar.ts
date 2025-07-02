import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MrAuthService } from '../services/mr-auth-service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-mr-loginbar',
  imports: [MatButtonModule, MatIconModule, MatMenuModule, RouterLink],
  templateUrl: './mr-loginbar.html',
  styleUrl: './mr-loginbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MrLoginbar implements OnInit {
  private readonly authService = inject(MrAuthService);
  private readonly jwtHelper = inject(JwtHelperService);

  userPhotoSrc = signal<string>('user_icon.png');
  userFirstName = signal('');
  userSurname = signal('');

  userBarName = computed(() => this.userFirstName() + ' ' + this.userSurname());
  constructor() {}

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    // Initialize user name if available
    this.userFirstName = this.authService.userFirst;
    this.userSurname = this.authService.userLast;
  }
}
