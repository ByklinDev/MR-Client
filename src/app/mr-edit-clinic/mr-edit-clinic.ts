import {
  afterNextRender,
  Component,
  inject,
  Injector,
  model,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MrAddClinicInterface } from '../interfaces/mr-add-clinic-interface';
import { MrClinicService } from '../services/mr-clinic-service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MrClinicInterface } from '../mr-clinic-interface';

@Component({
  selector: 'app-mr-edit-clinic',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './mr-edit-clinic.html',
  styleUrl: './mr-edit-clinic.css',
})
export class MrEditClinic {
  readonly dialogRef = inject(MatDialogRef<MrEditClinic>);
  readonly data = inject<MrClinicInterface>(MAT_DIALOG_DATA);
  private readonly clinicService = inject(MrClinicService);
  readonly id = model(this.data.id);
  readonly name = model(this.data.name);
  readonly city = model(this.data.city);
  readonly addressone = model(this.data.addressOne);
  readonly addresstwo = model(this.data.addressTwo);
  readonly phone = model(this.data.phone);
  
  edit(): void {
    const clinicData: MrClinicInterface = {
      id: this.id(),
      name: this.name(),
      city: this.city(),
      addressOne: this.addressone(),
      addressTwo: this.addresstwo(),
      phone: this.phone(),
    };

    this.clinicService.editClinic(clinicData).subscribe({
      next: () => {
        this.dialogRef.close(clinicData);
      },
      error: (error) => {
        console.error('Error adding clinic:', error);
      },
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private _injector = inject(Injector);

  @ViewChild('autosize')
  autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for content to render, then trigger textarea resize.
    afterNextRender(
      () => {
        this.autosize.resizeToFitContent(true);
      },
      {
        injector: this._injector,
      }
    );
  }
}
