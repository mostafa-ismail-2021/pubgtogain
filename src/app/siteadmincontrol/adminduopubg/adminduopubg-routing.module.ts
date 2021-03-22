import {NgModule} from "@angular/core";
import {Routes , RouterModule} from "@angular/router";
import {AdminduopubgComponent} from './adminduopubg.component';
import {AuthGuard} from '../../body/auth.guard';

const routes:Routes = [
    { path: 'duo/admincontrol', component: AdminduopubgComponent ,canActivate : [AuthGuard]},
]

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[RouterModule]
})

export class AdminDuoPubgRoutingModule {}