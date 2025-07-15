import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { MrUserUpdateInterface } from '../interfaces/mr-user-update-interface';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { MrAuthService } from './mr-auth-service';

@Injectable({
  providedIn: 'root',
})
export class MrUserService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  constructor() {}
  imageSrc = signal<string>(
    sessionStorage.getItem('userimage') ?? 'user_icon.png'
  );

  removeUser(userId: number) {
    return this.httpClient
      .delete(`${environment.apiUrl}/users/${userId}`)
      .subscribe({
        next: (response) => {
          this.imageSrc.set('user_icon.png'); // Reset image source after removal
        },
        error: (error) => {
          console.error('User removal failed:', error);
        },
      });
  }

  selectUserImage(userId: number): Promise<string> {
    return new Promise((resolve, reject) => {
      // Logic to select a file for the user photo
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.onchange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
          const file = target.files[0];
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageSrc = e.target?.result as string; // Get the file content as a string
            this.imageSrc.set(imageSrc); // Update the signal with the image URL
            this.uploadImage(file, userId); // Upload the image
            resolve(imageSrc);
          };
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file); // Read the file as an ArrayBuffer
        } else {
          reject(new Error('No file selected'));
        }
      };
      fileInput.click();
    });
  }

  uploadImage(file: File, userid: number): void {
    const formData = new FormData();
    formData.append('file', file);
    this.httpClient
      .patch(`${environment.apiUrl}/users/${userid}/photo`, formData, {
        headers: {
          Accept: 'application/json',
        },
      })
      .subscribe({
        next: (response) => {
          this.getUserImage(userid);
        },
        error: (error) => {
          console.error('Failed to save image:', error);
        },
      });
  }

  getUserImage(userId: number) {
    return this.httpClient
      .get(`${environment.apiUrl}/users/${userId}/photo`, {
        responseType: 'text',
      })
      .subscribe({
        next: (response) => {
          const imagesrc = response as string;
          this.imageSrc.set(imagesrc);
          sessionStorage.setItem(`userimage`, imagesrc); // Store the image in session storage);
        },
        error: (error) => {
          console.error('Failed to retrieve user image:', error);
        },
      });
  }

  updateUser(updateForm: MrUserUpdateInterface) {
    return this.httpClient
      .put<MrUserUpdateInterface>(
        `${environment.apiUrl}/users/${updateForm.id}`,
        updateForm,
        { responseType: 'json' }
      );
  }
}
