import { afterNextRender, Component, inject, Injector, model, ViewChild } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MrDialogDataInterface } from '../mr-dialog-data-interface';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'app-mr-add-medicine',
  imports: [    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose],
  templateUrl: './mr-add-medicine.html',
  styleUrl: './mr-add-medicine.css'
})
export class MrAddMedicine {
  readonly dialogRef = inject(MatDialogRef<MrAddMedicine>);
  readonly data = inject<MrDialogDataInterface>(MAT_DIALOG_DATA);
  readonly type = model(this.data.type);
  readonly dosageform = model(this.data.dosageform); 
  readonly container = model(this.data.container);
  readonly state = model(this.data.state);
  readonly expired = model<Date>(this.data.expired);
  readonly description = model(this.data.description);

  add(): void{
    console.log(this.type);
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
      },
    );
  }
}
