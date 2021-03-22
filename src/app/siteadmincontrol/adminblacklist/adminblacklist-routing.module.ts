import {NgModule} from "@angular/core";
import {Routes , RouterModule} from "@angular/router";
import {AdminblacklistComponent} from './adminblacklist.component';
import {AuthGuard} from '../../body/auth.guard';

const routes:Routes = [
    { path: 'blacklist/admincontrol', component: AdminblacklistComponent ,canActivate : [AuthGuard]},
]

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[RouterModule]
})

export class AdminBlacklistRoutingModule {}