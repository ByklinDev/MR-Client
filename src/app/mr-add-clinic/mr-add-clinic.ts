import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {
  afterNextRender,
  Component,
  inject,
  Injector,
  model,
  ViewChild,
} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MrDialogDataInterface } from '../mr-dialog-data-interface';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';





@Component({
  selector: 'app-mr-add-clinic',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './mr-add-clinic.html',
  styleUrl: './mr-add-clinic.css',
})
export class MrAddClinic {
  readonly dialogRef = inject(MatDialogRef<MrAddClinic>);
  readonly data = inject<MrDialogDataInterface>(MAT_DIALOG_DATA);
  readonly id = model(this.data.type);
  readonly name = model(this.data.dosageform);
  readonly city = model(this.data.container);
  readonly address = model(this.data.state);
  readonly address2 = model(this.data.expired);
  readonly phone = model(this.data.description);

  add(): void {
    console.log(this.id);
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


