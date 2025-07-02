import { Component, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MrSignUpService } from '../services/mr-sign-up-service';
import { MrSignUpInterface } from '../interfaces/mr-sign-up-interface';

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
  private readonly signUpService = inject(MrSignUpService);

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
    if (this.signupForm.valid) {
      const {
        firstname,
        lastname,
        initials,
        emailsignup,
        passwordsignup,
        confirmpassword,
      } = this.signupForm.value;

      let req: MrSignUpInterface = {
        firstName: firstname || '',
        lastName: lastname || '',
        password: passwordsignup || '',
        initials: initials || '',
        email: emailsignup || '',
        passwordRepeat: confirmpassword || '',
      };

      // Here you would typically call a service to handle the sign-up
      this.signUpService.signup(req);
    }
  }
}
