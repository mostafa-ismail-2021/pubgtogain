import {NgModule} from "@angular/core";
import { FormsModule } from "@angular/forms";
import {AdminsolopubgComponent} from './adminsolopubg.component';
import {AdminSoloPubgRoutingModule} from "./adminsolopubg-routing.module";
import { CommonModule } from "@angular/common";
import {AngularMaterialModule} from "../../angular-material.module";

@NgModule({
    declarations:[
        AdminsolopubgComponent,
    ],
    imports:[
        FormsModule,
        AdminSoloPubgRoutingModule,
        CommonModule,
        AngularMaterialModule
    ]
})
export class AdminSoloPubgModule { }