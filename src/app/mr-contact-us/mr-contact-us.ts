import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';


@Component({
  selector: 'app-mr-contact-us',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './mr-contact-us.html',
  styleUrl: './mr-contact-us.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MrContactUs {
errorMessage = signal('');


  contactForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('',[Validators.required, Validators.email]),
    phone: new FormControl(''),
    address: new FormControl(''),
    topic: new FormControl(''),
    message: new FormControl('',[Validators.required]),
  });

  sendEmail() {
    console.log(this.contactForm.value);
  }

   constructor() {
    merge(this.contactForm.controls.email.statusChanges, this.contactForm.controls.email.valueChanges)
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
}
