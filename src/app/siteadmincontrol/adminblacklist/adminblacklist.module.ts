import {NgModule} from "@angular/core";
import {AdminBlacklistRoutingModule} from "./adminblacklist-routing.module"
import { FormsModule } from "@angular/forms";
import {AdminblacklistComponent} from './adminblacklist.component';
import { CommonModule } from "@angular/common";
import {AngularMaterialModule} from "../../angular-material.module";

@NgModule({
    declarations:[
        AdminblacklistComponent,
    ],
    imports:[
        FormsModule,
        AdminBlacklistRoutingModule,
        CommonModule,
        AngularMaterialModule
    ]
})
export class AdminBlackListModule { }