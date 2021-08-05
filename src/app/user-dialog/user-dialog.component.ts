import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent implements OnInit {
  today: Date = new Date();
  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<UserDialogComponent>
  ) {}

  userForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    gender: ['MALE', [Validators.required]],
    address: ['', [Validators.required, Validators.maxLength(250)]],
    dob: ['', [Validators.required]],
  });

  formRef() {
    return this.userForm.controls;
  }

  ngOnInit(): void {}

  onSubmit() {
    let req: any = { ...this.userForm.value };
    req.dob = this.datePipe.transform(req.dob, 'yyyy-MM-dd');

    this.dialogRef.close(req);
  }
}
