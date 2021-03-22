import {NgModule} from "@angular/core";
import { FormsModule } from "@angular/forms";
import {AdmincharityadsComponent} from './admincharityads.component';
import {AdminCharityAdsRoutingModule} from "./admincharityads-routing.module";
import { CommonModule } from "@angular/common";
import {AngularMaterialModule} from "../../angular-material.module";

@NgModule({
    declarations:[
        AdmincharityadsComponent,
    ],
    imports:[
        FormsModule,
        AdminCharityAdsRoutingModule,
        CommonModule,
        AngularMaterialModule
    ]
})
export class AdminCharityAdsModule { }