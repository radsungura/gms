import { Routes } from '@angular/router';
import { Layout } from './layout/layout/layout';
import { Dashboard } from './features/dashboard/dashboard';
import { Login } from './features/login/login';
import { Group } from './features/group/group';
import { Users } from './features/users/users';
import { Borrow } from './features/borrow/borrow';
import { Search } from './features/search/search';
import { Saving} from './features/saving/saving';
import { Refund } from './features/refund/refund';
import { Member } from './features/member/member';
import { Fine } from './features/fine/fine';
import { Emfunds } from './features/emfunds/emfunds';
import { Emexpenses } from './features/emexpenses/emexpenses';
import { Repport } from './features/repport/repport';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    
    children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', component: Dashboard },
        { path: 'group', component: Group },
        { path: 'search', component: Search },
        { path: 'borrow', component: Borrow },
        { path: 'saving', component: Saving },
        { path: 'refund', component: Refund },
        { path: 'member', component: Member },
        { path: 'fines', component: Fine },
        { path: 'emfunds', component: Emfunds },
        { path: 'emexpenses', component: Emexpenses  },
        { path: 'borrow', component: Borrow },
        { path: 'repport', component: Repport },
        { path: 'users', component: Users }
    ],
  },
  { path: 'login', component: Login },
];
