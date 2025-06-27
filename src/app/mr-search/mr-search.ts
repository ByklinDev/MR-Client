import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-mr-search',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './mr-search.html',
  styleUrl: './mr-search.css',
})
export class MrSearch {
  searchFunc = input();
  searchForm = new FormGroup({
    searchTerm: new FormControl(''),
  });
}
