import {NgModule} from "@angular/core";
import { FormsModule } from "@angular/forms";
import {SiteadmincontrolComponent} from './siteadmincontrol.component';
import {AngularMaterialModule} from "../angular-material.module";
import {SiteAdminControlRoutingModule} from "./siteadmincontrol-routing.module";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations:[
        SiteadmincontrolComponent,
    ],
    imports:[
        AngularMaterialModule,
        FormsModule,
        SiteAdminControlRoutingModule,
        CommonModule
    ]
})
export class SiteAdminControlModule { }