import {NgModule} from "@angular/core";
import {Routes , RouterModule} from "@angular/router";
import {SiteadmincontrolComponent} from './siteadmincontrol.component';
import {AuthGuard} from '../body/auth.guard';

const routes:Routes = [
    { path: 'admincontrol', component: SiteadmincontrolComponent ,canActivate : [AuthGuard]},
]

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[RouterModule]
})

export class SiteAdminControlRoutingModule {}