import {NgModule} from "@angular/core";
import {Routes , RouterModule} from "@angular/router";
import {LoginadminComponent} from './form/loginadmin/loginadmin.component';

const routes:Routes = [
    { path: 'loginadmin', component: LoginadminComponent},
]

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[RouterModule]
})

export class AuthRoutingModule {}