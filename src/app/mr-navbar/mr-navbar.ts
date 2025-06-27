import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mr-navbar',
  imports: [MatTabsModule, RouterLink],
  templateUrl: './mr-navbar.html',
  styleUrl: './mr-navbar.css',
})
export class MrNavbar {
  activeTab: string = 'home';
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  isActiveTab(tab: string): boolean {
    return this.activeTab === tab;
  }
}
