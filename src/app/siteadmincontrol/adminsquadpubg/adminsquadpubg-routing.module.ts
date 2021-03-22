import {NgModule} from "@angular/core";
import {Routes , RouterModule} from "@angular/router";
import {AdminsquadpubgComponent} from './adminsquadpubg.component';
import {AuthGuard} from '../../body/auth.guard';

const routes:Routes = [
    { path: 'squad/admincontrol', component: AdminsquadpubgComponent ,canActivate : [AuthGuard]},
]

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[RouterModule]
})

export class AdminSquadPubgRoutingModule {}