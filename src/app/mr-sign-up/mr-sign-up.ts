import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mr-sign-up',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './mr-sign-up.html',
  styleUrl: './mr-sign-up.css',
})
export class MrSignUp {
  signupForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    initials: new FormControl('', [Validators.required]),
    emailsignup: new FormControl('', [Validators.required, Validators.email]),
    passwordsignup: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmpassword: new FormControl('', [Validators.required]),
  });

  signupUser() {
    // Implement sign-up logic here
    console.log('Sign-up button clicked');
  }
}
