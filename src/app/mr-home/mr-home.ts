import { Component, inject, OnInit } from '@angular/core';
import { MrContactUs } from '../mr-contact-us/mr-contact-us';
import { MrActiveTabService } from '../services/mr-active-tab-service';

@Component({
  selector: 'app-mr-home',
  imports: [MrContactUs],
  templateUrl: './mr-home.html',
  styleUrl: './mr-home.css',
})
export class MrHome implements OnInit {
  private readonly activeTabService = inject(MrActiveTabService);
  ngOnInit(): void {
    this.activeTabService.setActiveTab('home');
  }
}
