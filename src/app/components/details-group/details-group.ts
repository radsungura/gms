import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-details-group',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './details-group.html',
  styleUrl: './details-group.scss'
})
export class DetailsGroup {
// route = inject(ActivatedRoute);
  document: any;
  constructor(public dialogRef: MatDialogRef<DetailsGroup>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ){
      console.log(data);
      
    }
    ngOnInit() {
    // const id = this.route.snapshot.paramMap.get('id');
    // Simule une récupération depuis un service
    
  }

}
