import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MrAuthService } from '../services/mr-auth-service';
import { MrActiveTabService } from '../services/mr-active-tab-service';

@Component({
  selector: 'app-mr-log-in',
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
  ],
  templateUrl: './mr-log-in.html',
  styleUrl: './mr-log-in.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MrLogIn implements OnInit {
  private readonly authService = inject(MrAuthService);
  private readonly activeTabService = inject(MrActiveTabService);

  loginForm = new FormGroup({
    emailLogin: new FormControl<string>('', [
      Validators.required,
      Validators.email,
    ]),
    passwordLogin: new FormControl<string>('', [Validators.required]),
    rememberLogin: new FormControl<boolean>(false),
  });

  loginError = signal('');

  loginUser() {
    if (this.loginForm.valid) {
      const { emailLogin, passwordLogin, rememberLogin } = this.loginForm.value;
      this.authService.login(emailLogin!, passwordLogin!, rememberLogin!);
    }
  }

  ngOnInit() {
    // Initialize form with default values or any other setup
    this.loginForm.patchValue({
      emailLogin: localStorage.getItem('Email') || '',
      passwordLogin: '',
      rememberLogin: localStorage.getItem('RememberMe') === 'true' || false,
    });
    this.loginError = this.authService.loginError;
    this.activeTabService.setActiveTab('login');
  }
}
