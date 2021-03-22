import {NgModule} from "@angular/core";
import {Routes , RouterModule} from "@angular/router";
import {AdmincharityadsComponent} from './admincharityads.component';
import {AuthGuard} from '../../body/auth.guard';

const routes:Routes = [
    { path: 'charityads/admincontrol', component: AdmincharityadsComponent ,canActivate : [AuthGuard]},
]

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[RouterModule]
})

export class AdminCharityAdsRoutingModule {}