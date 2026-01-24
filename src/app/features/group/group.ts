import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog   } from '@angular/material/dialog';
import { DetailsGroup } from '../../components/details-group/details-group';
import { Delete } from '../../components/delete/delete';
import { Members } from '../../services/members';
import { Groups } from '../../services/groups';
import { Doc } from "../../../models/interfaces";
import { CommonModule } from '@angular/common';
import { EditGroup } from '../../components/edit-group/edit-group';
import { Details } from '../../components/details/details';

@Component({
  selector: 'app-group',
  imports: [MatTableModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule, CommonModule],
  templateUrl: './group.html',
  styleUrl: './group.scss'
})

export class Group {
  group: Doc[] = [];
  view: string ='';
  members: any = [];
  females: any = [];
  displayedColumns: string[] = ['id', 'title', 'membres', 'sold', 'location', 'status', 'actions'];
  constructor(private dialog: MatDialog, private groups: Groups, private membersData: Members){

  }
  ngOnInit() {
    this.loadDocs();
  }
  loadDocs() {
    this.membersData.getAll().subscribe((m: any)=> { 
      let members: [] = m;
      this.groups.getAll().subscribe((docs: any) => {
        this.group = docs.reverse();
        this.group.forEach((el: any) => {
          // get members number
          el.members = members.filter(
            (member: any) => { 
              return member.group == el.name;
            }).length || 0;
          // get femals number
          el.females = members.filter((member: any) => {
            return member.group == el.name && member.gender == "F";
          }).length || 0;
        });
      });

    });

    
  }

  add(){    
    const dialogRef = this.dialog.open(EditGroup, {
      width: '90vw', // ou '80vw' pour responsive
      maxHeight: '1000vh',
      data: { action: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadDocs();
      }
    });
  }

  details(doc: any) {
    // Naviguer vers une page ou ouvrir une modale
    const dialogRef = this.dialog.open(Details, {
        width: '90vw', // ou '80vw' pour responsive
        maxHeight: '1000vh',
        data: { cat: 'group', item: doc }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // this.groupService.addDocument(result).subscribe(() => this.loadgroup());
        }
      });
  }

  edit(doc: any) {
    // Naviguer vers un formulaire ou afficher une modale
    const dialogRef = this.dialog.open(EditGroup, {
        width: '90vw', // ou '80vw' pour responsive
        maxHeight: '1000vh',
        data: { action: 'edit', data: doc }
      });

      dialogRef.afterClosed().subscribe(result => {
          this.loadDocs();
      });
  }

  delete(doc: any) {
    // Confirmer et supprimer via API ou service
    const dialogRef = this.dialog.open(Delete, {
        width: '90vw', // ou '80vw' pour responsive
        maxHeight: '1000vh',
        data: { cat: 'group', data: doc }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loadDocs()
        }
      });
  }

}
