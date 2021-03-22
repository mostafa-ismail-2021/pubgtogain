import {NgModule} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {LoginadminComponent} from './form/loginadmin/loginadmin.component';
import {AngularMaterialModule} from "../angular-material.module";
import {AuthRoutingModule} from "./auth-routing.module";

@NgModule({
    declarations:[
        LoginadminComponent,
    ],
    imports:[
        CommonModule,
        AngularMaterialModule,
        FormsModule,
        AuthRoutingModule
    ]
})
export class AuthModule { }