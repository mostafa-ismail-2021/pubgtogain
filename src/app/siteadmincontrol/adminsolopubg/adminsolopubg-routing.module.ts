import {NgModule} from "@angular/core";
import {Routes , RouterModule} from "@angular/router";
import {AdminsolopubgComponent} from './adminsolopubg.component';
import {AuthGuard} from '../../body/auth.guard';

const routes:Routes = [
    { path: 'solo/admincontrol', component: AdminsolopubgComponent ,canActivate : [AuthGuard]},
]

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[RouterModule]
})

export class AdminSoloPubgRoutingModule {}