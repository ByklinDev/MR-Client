import { Component, inject, OnInit, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { sign } from 'crypto';
import { MrAuthService } from '../services/mr-auth-service';

@Component({
  selector: 'app-mr-navbar',
  imports: [MatTabsModule, RouterLink],
  templateUrl: './mr-navbar.html',
  styleUrl: './mr-navbar.css',
})
export class MrNavbar implements OnInit {
  private readonly authService = inject(MrAuthService);

  activeTab: string = 'home';
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  isActiveTab(tab: string): boolean {
    return this.activeTab === tab;
  }

  showLogin = signal<boolean>(true);
  hideLogin = signal<boolean>(false);

  ngOnInit() {
    this.showLogin = this.authService.showLogin;
    this.hideLogin = this.authService.hideLogin;
  }
}
