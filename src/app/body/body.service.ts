import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {body} from './body.model';
import {freead} from './freead.model';
import {reportHacker} from './reportHacker.model';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { ErrorComponent } from '../error/error.component';
import { MatDialog } from '@angular/material/dialog';
import {environment} from "../../environments/environment";
const BACKEND_URL = environment.apiUrl + "/solo/";
@Injectable({
  providedIn: 'root'
})
export class BodyService {

  constructor(private http:HttpClient,private route:Router , private dialog:MatDialog) { }
  private formAdded:body = null;
  private random:number = null;
  private freeAd:freead = null;
  private randomFreeAd:number;
  private reportHacker:reportHacker = null;
  private randomreportHacker:number;


  getVideoIdAndRegisterType():Observable<object>{
    return this.http.post<{register : boolean,videoId : string,videoType : string, adAppearanceCountry:string , phone:boolean}>(BACKEND_URL+'registerGetAd',{send:true});
  }
  checkPerson(
    email:string,
    pubgId:string,
    phone:string,
    videoId:string){
      return new Observable(observer => {
        this.http.post<{existEmail:boolean , existIdPubg:boolean , existPhone:boolean , random:number}>(BACKEND_URL+'checkPerson',{email:email , pubgId :pubgId , playerPhone:phone})
        .subscribe((data:{existEmail:boolean , existIdPubg:boolean , existPhone:boolean , random:number})=>{
          if(data.random == null){
            observer.next({existEmail:data.existEmail , existIdPubg:data.existIdPubg , existPhone:data.existPhone});
            observer.complete();
          }
          else{
            this.formAdded = {
              email:email,
              pubgId : pubgId,
              playerPhone: phone,
              videoId:videoId,
              code:null
            };
            this.random = data.random;
            this.route.navigate(['/register/soloconfirmEmail']); 
          }
        }, error => {this.dialog.open(ErrorComponent)})
      })
  }
  increaseVideoFinish(videoId:string,videoType:string,adAppearanceCountry:string){
    this.http.post(BACKEND_URL+'increaseVideo',{videoId:videoId,videoType:videoType,adAppearanceCountry:adAppearanceCountry})
    .subscribe();
  }

  getFormAddedAndRandom(){
    if(this.formAdded == null || this.random == null){
      return false;
    }
    else{
      return true;
    }
  }

  checkRandom(randon:number){
    if(randon == this.random){
      return true;
    }
    else{
      return false;
    }
  }

  deleteRandom(){
    this.formAdded = null;
    this.random = null
  }

  sendData(randon:number){
    if(randon == this.random && this.random != null){
      this.formAdded.code = randon;
      return this.http.post<{message:string}>(BACKEND_URL+'sendData',this.formAdded);
    }
    else{
      return new Observable<{message:string}>( observer => {
        observer.next( {message:"error occure please register again"})
        observer.complete()
      })
    }
  }
    /*get date*/
  getVideoIdAndDateType():Observable<object>{
    return this.http.post<{dateAppearance : boolean,videoId : string,videoType : string , adAppearanceCountry:string}>(BACKEND_URL+'dateGetAd',{send:true});
  }

  getPlayerDate(idPubg:string){
    return  this.http.post<{date:string , time:number,message:string}>(BACKEND_URL+'getPlayerDate',{idpubg:idPubg});
  }
  /*free ad*/
  getVideoIdAndFreeAdType():Observable<object>{
    return this.http.post<{freeAdResgister : boolean,videoId : string,videoType : string , adAppearanceCountry:string,adsWillAppear:Array<string>}>(BACKEND_URL+'freeAdGetAd',{send:true});
  }
  checkPersonFreeAd(
    email:string,
    youtube:string,
    country:string,
    videoId:string){
      return new Observable(observer => {
        this.http.post<{existEmail:boolean , existyoutubeVideoId:boolean , random:number}>(BACKEND_URL+'checkPersonFreeAd',{email:email , youtube :youtube})
        .subscribe((data:{existEmail:boolean , existyoutubeVideoId:boolean , random:number})=>{
          if(data.random == null){
            observer.next({existEmail:data.existEmail , existyoutubeVideoId:data.existyoutubeVideoId});
            observer.complete();
          }
          else{
            this.freeAd = {
              email:email,
              Youtube : youtube,
              Country:country,
              videoId:videoId,
              code:null
            };
            this.randomFreeAd = data.random;
            this.route.navigate(['/register/soloconfirmEmailFreeAd']);
          }
        }, error => {this.dialog.open(ErrorComponent)})
      })
  }
  getFormAddedAndRandomFreeAd(){
    if(this.freeAd == null || this.randomFreeAd == null){
      return false;
    }
    else{
      return true;
    }
  }

  checkRandomFreeAd(randon:number){
    if(randon == this.randomFreeAd){
      return true;
    }
    else{
      return false;
    }
  }

  deleteRandomFreeAd(){
    this.freeAd = null;
    this.randomFreeAd = null
  }

  sendDataFreeAd(randon:number){
    if(randon == this.randomFreeAd && this.randomFreeAd != null){
      this.freeAd.code = randon;
      return this.http.post<{message:string}>(BACKEND_URL+'sendDataFreeAd',this.freeAd) 
    }
    else{
      return new Observable<{message:string}>( observer => {
        observer.next( {message:"error occure please register again"})
        observer.complete()
     })
    }
  }
  /*report hacker */
  getReportHackerType():Observable<object>{
    return this.http.post<{reportHackerResgister : boolean,apperHackerAndWinners:boolean}>(BACKEND_URL+'reportHackerRegister',{send:true});
  }
  checkPersonHacker(
    email:string,
    googleDrive:string){
      return new Observable(observer => {
        this.http.post<{existEmail:boolean , existGoogleDrive:boolean , random:number}>(BACKEND_URL+'checkPersonHacker',{email:email , googleDrive :googleDrive})
        .subscribe((data:{existEmail:boolean , existGoogleDrive:boolean , random:number})=>{
          if(data.random == null){
            observer.next({existEmail:data.existEmail , existGoogleDrive:data.existGoogleDrive});
            observer.complete();
          }
          else{
            this.reportHacker = {
              email:email,
              googleDrive : googleDrive,
              code:null
            };
            this.randomreportHacker = data.random;
            this.route.navigate(['/register/soloconfirmEmailHacker']);
          }
        }, error => {this.dialog.open(ErrorComponent)})
      })
  }
  getFormAddedAndRandomReportHacker(){
    if(this.reportHacker == null || this.randomreportHacker == null){
      return false;
    }
    else{
      return true;
    }
  }

  checkRandomReportHacker(randon:number){
    if(randon == this.randomreportHacker){
      return true;
    }
    else{
      return false;
    }
  }

  deleteRandomReportHacker(){
    this.reportHacker = null;
    this.randomreportHacker = null
  }

  sendDataReportHacker(randon:number){
    if(randon == this.randomreportHacker && this.randomreportHacker != null){
      this.reportHacker.code = randon;
      return this.http.post<{message:string}>(BACKEND_URL+'sendDataHacker',this.reportHacker) 
    }
    else{
      return new Observable<{message:string}>( observer => {
        observer.next( {message:"error occure please register again"})
        observer.complete()
     })
    }
  }
  getPlayerState(idPubg:string){
    return this.http.post<string>(BACKEND_URL+'getPlayerState',{idpubg:idPubg});
  }
}
