import { Component, input, model, output, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-mr-search',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './mr-search.html',
  styleUrl: './mr-search.css',
})
export class MrSearch {
  onSearchText = output<string>();
  term = signal('');
  changeText(){
    this.onSearchText.emit(this.term());
  }
}
