import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { V } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-mr-log-in',
  imports: [MatInputModule, ReactiveFormsModule, MatFormFieldModule, MatCheckboxModule],
  templateUrl: './mr-log-in.html',
  styleUrl: './mr-log-in.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MrLogIn {
  loginForm = new FormGroup({
    emailLogin: new FormControl('', [Validators.required, Validators.email]),
    passwordLogin: new FormControl('', [Validators.required]),
    rememberLogin: new FormControl(false),
  });

  loginUser() {
    console.log(this.loginForm.value);
  }
}
