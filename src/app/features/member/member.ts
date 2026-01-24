import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog   } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { DetailsUser } from '../../components/details-user/details-user';
import { Delete } from '../../components/delete/delete';
import { User } from '../../../models/interfaces';
import { Members } from '../../services/members'
import { EditMembers } from '../../components/edit-members/edit-members';
import { Details } from '../../components/details/details';
@Component({
  selector: 'app-member',
  imports: [MatTableModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './member.html',
  styleUrl: './member.scss'
})
export class Member {
displayedColumns: string[] = ['id', 'name', 'cni', 'tel', 'genre', 'groupe','statut', 'actions'];
  users : User[] = [];
  constructor(private dialog: MatDialog, private data: Members){

  }
  ngOnInit() {
    this.loadUsers();
  }
  loadUsers() {
    this.data.getAll().subscribe((users) => (this.users = users.reverse()));
  }
  add(){
    const dialogRef = this.dialog.open(EditMembers, {
      width: '90vw', // ou '80vw' pour responsive
      maxHeight: '1000vh',

      data: { action: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
        // this.usersService.adduser(result).subscribe(() => this.loadusers());
      }
    });
  }

  details(user: any) {
  // console.log('📄 Détails du user :', user);
  // Naviguer vers une page ou ouvrir une modale
   const dialogRef = this.dialog.open(Details, {
      width: '90vw', // ou '80vw' pour responsive
      maxHeight: '1000vh',
      data: { cat: 'members', item: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.usersService.adduser(result).subscribe(() => this.loadusers());
      }
    });
  }

  edit(user: any) {
    // Naviguer vers un formulaire ou afficher une modale
    const dialogRef = this.dialog.open(EditMembers, {
        width: '90vw', // ou '80vw' pour responsive
        maxHeight: '1000vh',
        data: { action: 'edit', data: user }
      });

      dialogRef.afterClosed().subscribe(result => {
          this.loadUsers();
          // this.usersService.adduser(result).subscribe(() => this.loadusers());
      });
  }

  delete(user: any) {
    // Confirmer et supprimer via API ou service
    const dialogRef = this.dialog.open(Delete, {
        width: '90vw', // ou '80vw' pour responsive
        maxHeight: '1000vh',
        data: { cat: 'members', data: user }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loadUsers();
        }
      });
  }

}
