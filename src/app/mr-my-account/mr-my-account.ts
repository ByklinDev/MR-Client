import { Component, computed, signal } from '@angular/core';
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

@Component({
  selector: 'app-mr-my-account',
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatMenuModule, MatIconModule],
  templateUrl: './mr-my-account.html',
  styleUrl: './mr-my-account.css',
})
export class MrMyAccount {
  userPhotoSrc = signal<string>('user_icon.png');
  myAccountForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    initials: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    oldpassword: new FormControl('', [Validators.required]),
    newpassword: new FormControl('', [Validators.required]),
    confirmpassword: new FormControl('', [Validators.required]),
  });
  userFirstName = signal<string>('David');
  userSurname = signal<string>('Duchovny');
  userBarName = computed(() => this.userFirstName() + ' ' + this.userSurname());

  updateAccount() {
    console.log(this.myAccountForm.value);
  }
}
// This component allows users to manage their account details,
// including updating personal information and changing passwords.
