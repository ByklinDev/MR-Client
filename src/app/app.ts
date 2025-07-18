import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';
import { MrLoginbar } from "./mr-loginbar/mr-loginbar";
import { MrNavbar } from "./mr-navbar/mr-navbar";
import { MrFooter } from './mr-footer/mr-footer';
import { MrUserService } from './services/mr-user-service';
import { MrAuthService } from './services/mr-auth-service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatIconModule, MatButtonModule, MrLoginbar, MrNavbar, MrFooter],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected title = 'mr';
  private readonly userService  = inject(MrUserService);
  private readonly authService = inject(MrAuthService);
  private readonly router = inject(Router);


  ngOnInit(): void {
    // Initialize user image from session storage
    const userId = this.authService.getUserId();
    if (userId){
      this.userService.getUserImage(userId)
          .subscribe({
              next: (response) => {
                const imagesrc = response as string;
                this.userService.imageSrc.set(imagesrc);
                sessionStorage.setItem(`userimage`, imagesrc); // Store the image in session storage);
              },
              error: (error) => {
                this.authService.logout();
              },
            });
    }else{
      this.authService.logout();
      this.router.navigate(['/login']);
    }   
  }
}
