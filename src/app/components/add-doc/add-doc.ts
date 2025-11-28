import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Doc } from '../../../models/interfaces';

@Component({
  selector: 'app-add-doc',
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './add-doc.html',
  styleUrl: './add-doc.scss'
})
export class AddDoc {
form: any;
constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddDoc>,
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
onSubmit(item: Doc) {
    if (this.form.valid) {
      console.log("add items", item);
      
      this.dialogRef.close(this.form.value); // renvoie les données modifiées
    }
  }

  addDoc(item: Doc) {
    if (this.form.valid) {
      console.log("add items", item);
      this.dialogRef.close(this.form.value); // renvoie les données modifiées
    }
  }

}
