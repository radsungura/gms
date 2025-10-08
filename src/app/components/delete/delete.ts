import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete',
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './delete.html',
  styleUrl: './delete.scss'
})
export class Delete {
form: any;
constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<Delete>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
  // if (data.mode === 'edit' && data.document) {
  //     this.formData = { ...data.document };
  //   }

  this.form = this.fb.group({
    titre: [this.data.titre, Validators.required],
    categorie: [this.data.categorie],
    localisation: [this.data.localisation],
    statut: [this.data.statut]
  });
}
  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value); // renvoie les données modifiées
    }
  }
}

