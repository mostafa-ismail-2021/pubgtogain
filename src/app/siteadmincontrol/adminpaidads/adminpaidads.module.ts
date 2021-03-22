import {NgModule} from "@angular/core";
import { FormsModule } from "@angular/forms";
import {AdminpaidadsComponent} from './adminpaidads.component';
import {AdminPaidAdsRoutingModule} from "./adminpaidads-routing.module";
import { CommonModule } from "@angular/common";
import {AngularMaterialModule} from "../../angular-material.module";

@NgModule({
    declarations:[
        AdminpaidadsComponent,
    ],
    imports:[
        FormsModule,
        AdminPaidAdsRoutingModule,
        CommonModule,
        AngularMaterialModule
    ]
})
export class AdminPaidAdsModule { }