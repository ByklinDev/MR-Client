import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { MrEmailCreateInterface } from '../interfaces/mr-email-create-interface';
import { MrEmailService } from '../services/mr-email-service';
import { response } from 'express';

@Component({
  selector: 'app-mr-contact-us',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './mr-contact-us.html',
  styleUrl: './mr-contact-us.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MrContactUs implements OnInit {
  private readonly emailService = inject(MrEmailService);

  errorMessage = signal('');
  errorMessageSend = signal('');
  successMessage = signal('');
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    topic: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  });

  sendEmail() {
    this.errorMessageSend.set('');
    const email: MrEmailCreateInterface = {
      address: this.contactForm.value.address ?? '',
      name: this.contactForm.value.name ?? '',
      email: this.contactForm.value.email ?? '',
      topic: this.contactForm.value.topic ?? '',
      message: this.contactForm.value.message ?? '',
      phone: this.contactForm.value.phone ?? '',
    };
    this.emailService.sendEmail(email).subscribe({
      next: (response) => {
        this.errorMessageSend.set('');
        this.successMessage.set('Message was sent successfully.');
        this.contactForm.reset();
      },
      error: (err) => {
        this.errorMessageSend.set(err.message);
      },
    });
  }

  constructor() {
    merge(
      this.contactForm.controls.email.statusChanges,
      this.contactForm.controls.email.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }
  updateErrorMessage() {
    if (this.contactForm.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.contactForm.controls.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  ngOnInit(): void {
    this.errorMessageSend.set('');
    this.successMessage.set('');
  }
}
