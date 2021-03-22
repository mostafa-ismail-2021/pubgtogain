import {NgModule} from "@angular/core";
import {Routes , RouterModule} from "@angular/router";
import {AdminpaidadsComponent} from './adminpaidads.component';
import {AuthGuard} from '../../body/auth.guard';

const routes:Routes = [
    { path: 'paidads/admincontrol', component: AdminpaidadsComponent ,canActivate : [AuthGuard]},
]

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[RouterModule]
})

export class AdminPaidAdsRoutingModule {}