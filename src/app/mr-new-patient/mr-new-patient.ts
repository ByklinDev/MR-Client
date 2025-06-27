import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-mr-new-patient',
  imports: [
    MatRadioModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
  ],
  templateUrl: './mr-new-patient.html',
  styleUrl: './mr-new-patient.css',
})
export class MrNewPatient {
  patientForm = new FormGroup({
    patientNumber: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl<Date>(new Date(), [Validators.required]),
    gender: new FormControl('1'),
  });
  addPatient() {
    console.log('');
  }
}
