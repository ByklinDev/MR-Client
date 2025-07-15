import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MrAuthService } from '../services/mr-auth-service';
import { MrUserService } from '../services/mr-user-service';
import { response } from 'express';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mr-my-account',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
  ],
  templateUrl: './mr-my-account.html',
  styleUrl: './mr-my-account.css',
})
export class MrMyAccount implements OnInit {
  private readonly authService = inject(MrAuthService);
  private readonly userService = inject(MrUserService);
  private readonly router = inject(Router);

  userPhotoSrc = signal<string>('user_icon.png');
  myAccountForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    initials: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    oldpassword: new FormControl('', [Validators.required]),
    newpassword: new FormControl(''),
    confirmpassword: new FormControl(''),
  });
  userFirstName = signal<string>('');
  userSurname = signal<string>('');
  userId = signal<number>(0);

  userBarName = computed(() => this.userFirstName() + ' ' + this.userSurname());

  removeAccount() {
    this.userService.removeUser(this.userId());
    this.authService.logout();
  }

  updateAccount() {
    if (this.myAccountForm.valid) {
      const {
        firstname,
        lastname,
        initials,
        email,
        oldpassword,
        newpassword,
        confirmpassword,
      } = this.myAccountForm.value;

      // Prepare the update request object
      let updateRequest = {
        id: this.userId(),
        firstName: firstname || '',
        lastName: lastname || '',
        initials: initials || '',
        email: email || '',
        password: oldpassword || '',
        newPassword: newpassword || '',
        confirmPassword: confirmpassword || '',
        state: 1, // Assuming state is a fixed value for this example
        clinicId: 0, // Assuming clinicId is a fixed value for this example
      };

      // Call the service to update user details
      this.userService.updateUser(updateRequest).subscribe({
        next: (response) => {
          this.authService.userFirst.set(response.firstName);
          this.authService.userLast.set(response.lastName);
          this.authService.userInitials.set(response.initials);
          this.router.navigate(['/']);
        },
      });
    }
  }

  selectFile() {
    // Logic to select a file for the user photo
    this.userService.selectUserImage(this.userId()).then((imageSrc) => {
      this.userPhotoSrc.set(imageSrc);
    });
  }

  ngOnInit() {
    // Initialize form with default values or any other setup
    this.myAccountForm.patchValue({
      firstname: this.authService.userFirst(),
      lastname: this.authService.userLast(),
      initials: this.authService.userInitials(),
      email: this.authService.userEmail(),
      oldpassword: this.authService.userOldPassword(),
    });
    this.userFirstName = this.authService.userFirst;
    this.userSurname = this.authService.userLast;
    this.userId = this.authService.userId;
    this.userPhotoSrc = this.userService.imageSrc;
  }
}
