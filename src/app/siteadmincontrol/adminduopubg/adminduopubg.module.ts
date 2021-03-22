import {NgModule} from "@angular/core";
import { FormsModule } from "@angular/forms";
import {AdminduopubgComponent} from './adminduopubg.component';
import {AdminDuoPubgRoutingModule} from "./adminduopubg-routing.module";
import { CommonModule } from "@angular/common";
import {AngularMaterialModule} from "../../angular-material.module";

@NgModule({
    declarations:[
        AdminduopubgComponent,
    ],
    imports:[
        FormsModule,
        AdminDuoPubgRoutingModule,
        CommonModule,
        AngularMaterialModule
    ]
})
export class AdminDuoPubgModule { }