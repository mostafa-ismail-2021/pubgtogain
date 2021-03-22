import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environment";
const BACKEND_URL = environment.apiUrl + "/paidads/";

@Injectable({
    providedIn: 'root'
})
export class adminpaidad {

    constructor(private http:HttpClient) { }

    addPaidAdToServer(paidAd:object,adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "addPaidAd" , {paidAd:paidAd,adminData:adminData});
    }
    getPaidAds(adminData:string){
        return this.http.post<Array<object>>(BACKEND_URL + "getPaidAds",{adminData:adminData});
    }
    getPaidAdsNot(adminData:string){
        return this.http.post<Array<object>>(BACKEND_URL + "getPaidAdsNot",{adminData:adminData});
    }
    getPaidAdsCompany(companyName:string,adminData:string){
        return this.http.post<Array<object>>(BACKEND_URL + "getPaidAdsCompany" , {companyName:companyName,adminData:adminData});
    }
    getPaidAdsComFalse(adminData:string){
        return this.http.post<Array<object>>(BACKEND_URL + "getPaidAdsComFalse",{adminData:adminData});
    }
    setPaidComTrue(_id:string,adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "setPaidComTrue" , {_id:_id,adminData:adminData});
    }
    deletePaidAd(_id:string,adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "deletePaidAd" , {_id:_id,adminData:adminData});
    }
}