import { Component, inject, model, OnInit, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MrUserRoleInterface } from '../interfaces/mr-user-role-interface';
import { MrRoleService } from '../services/mr-role-service';
import { MrRoleInterface } from '../interfaces/mr-role-interface';
import { MrEditUserRoleInterface } from '../interfaces/mr-edit-user-role-interface';
import { MrUserService } from '../services/mr-user-service';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-mr-edit-user-role',
  imports: [
    MatDialogActions,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
      ReactiveFormsModule,
  ],
  templateUrl: './mr-edit-user-role.html',
  styleUrl: './mr-edit-user-role.css',
})
export class MrEditUserRole implements OnInit {
  readonly dialogRef = inject(MatDialogRef<MrEditUserRole>);
  readonly data = inject<MrUserRoleInterface>(MAT_DIALOG_DATA);

  private readonly roleService = inject(MrRoleService);
  private readonly userService = inject(MrUserService);

  readonly id = model(this.data.id);
  readonly firstName = model(this.data.firstName);
  readonly lastName = model(this.data.lastName);
  readonly roleId = model(this.data.roleId);
  readonly roleName = model(this.data.roleName);

  readonly oldRoleId: number = this.data.roleId;

  errorMessage = signal('');
  roles: MrRoleInterface[] = [];

  edit(): void {
    const userRole: MrEditUserRoleInterface = {
      userId: this.id(),
      roleId: this.roleId(),
    };

    this.userService.addUserRole(userRole).subscribe({
      next: (response) => {
        const oldRole = {
          userId: this.id(),
          roleId: this.oldRoleId,
        };
        this.userService.deleteUserRole(oldRole).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (error) => {
            this.errorMessage.set(error.message);
          },
        });
      },
      error: (error) => {
        this.errorMessage.set(error.message);
      },
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.roleService.getAllRoles().subscribe({
      next: (response) => {
        this.roles = response.body as MrRoleInterface[];
      }
    });
  }

  constructor() {
    this.oldRoleId = this.data.roleId;
  }
}
