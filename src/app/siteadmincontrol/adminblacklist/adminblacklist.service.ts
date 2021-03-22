import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environment";
const BACKEND_URL = environment.apiUrl + "/blacklist/";

@Injectable({
    providedIn: 'root'
})

export class adminblacklist {

    constructor(private http:HttpClient) { }

    addBlackListToServer(blackListPerson:object,adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "addBlackList" , {blackListPerson:blackListPerson,adminData:adminData});
    }
    getBlackList(adminData:string){
        return this.http.post<Array<object>>(BACKEND_URL + "getBlackList",{adminData:adminData});
    }
    deleteBlackList(_id:string,adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "deleteBlackList" , {_id:_id,adminData:adminData});
    }
}