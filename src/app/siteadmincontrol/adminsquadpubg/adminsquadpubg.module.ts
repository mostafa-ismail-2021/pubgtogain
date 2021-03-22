import {NgModule} from "@angular/core";
import { FormsModule } from "@angular/forms";
import {AdminsquadpubgComponent} from './adminsquadpubg.component';
import {AdminSquadPubgRoutingModule} from "./adminsquadpubg-routing.module";
import { CommonModule } from "@angular/common";
import {AngularMaterialModule} from "../../angular-material.module";

@NgModule({
    declarations:[
        AdminsquadpubgComponent,
    ],
    imports:[
        FormsModule,
        AdminSquadPubgRoutingModule,
        CommonModule,
        AngularMaterialModule
    ]
})
export class AdminSquadPubgModule { }