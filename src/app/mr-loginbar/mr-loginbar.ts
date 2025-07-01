import { Component, computed, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterModule } from '@angular/router';
import { MrAuthService } from '../services/mr-auth-service';
import { J } from '@angular/cdk/keycodes';
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
  constructor() {
  }

  logout() {
    console.log(`Logging out...${this.userBarName()}`);
    this.authService.logout();
    console.log(`User ${this.userBarName()} logged out successfully.`);
  }

  ngOnInit() {
    // Initialize user name if available 
    this.userFirstName =  this.authService.userFirst;
    this.userSurname =  this.authService.userLast;
  }
}
