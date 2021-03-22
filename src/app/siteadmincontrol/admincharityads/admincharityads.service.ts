import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environment";
const BACKEND_URL = environment.apiUrl + "/charityads/";

@Injectable({
    providedIn: 'root'
})

export class admincharityads {

    constructor(private http:HttpClient) { }

    addCharityAdToServer(charityAd:object,adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "addCharityAd" , {charityAd:charityAd,adminData:adminData});
    }
    getCharityAds(adminData:string){
        return this.http.post<Array<object>>(BACKEND_URL + "getCharityAds",{adminData:adminData});
    }
    deleteCharityAd(_id:string,adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "deleteCharityAd" , {_id:_id,adminData:adminData});
    }
}