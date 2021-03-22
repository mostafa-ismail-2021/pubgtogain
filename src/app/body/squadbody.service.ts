import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {squadbody} from './squadbody.model';
import {squadbodymember} from './squadbodymember.model';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { ErrorComponent } from '../error/error.component';
import { MatDialog } from '@angular/material/dialog';
import {freead} from './freead.model';
import {reportHacker} from './reportHacker.model';
import {environment} from "../../environments/environment";
const BACKEND_URL = environment.apiUrl + "/squad/";

@Injectable({
  providedIn: 'root'
})
export class SquadbodyService {

  constructor(private http:HttpClient,private route:Router , private dialog:MatDialog) { }
  private formAdded:squadbody = null;
  private random:number = null;
  private memberFormAdded:squadbodymember = null;
  private memberRandom:number = null;
  private placeIdPubg:string ="not exist";
  private freeAd:freead = null;
  private randomFreeAd:number;
  private reportHacker:reportHacker = null;
  private randomreportHacker:number;

  getVideoIdAndRegisterType():Observable<object>{
    return this.http.post<{register : boolean,videoId : string,videoType : string, adAppearanceCountry:string , phone:boolean}>(BACKEND_URL + 'tLRegisterGetAd',{send:true});
  }
  increaseVideoFinish(videoId:string,videoType:string,adAppearanceCountry:string){
    this.http.post(BACKEND_URL + 'increaseVideoId',{videoId:videoId,videoType:videoType,adAppearanceCountry:adAppearanceCountry})
    .subscribe();
  }
  checkPerson(
    email:string,
    pubgId:string,
    pubgIdFirstMember:string,
    pubgIdSecondMember:string,
    pubgIdThirdMember:string,
    phone:string,
    videoId:string){
      return new Observable(observer => {
        this.http.post<{existEmail:boolean , existIdPubg:boolean,firstBlackList:boolean,secondBlackList:boolean,thirdBlackList:boolean , existPhone:boolean , random:number}>(
          BACKEND_URL + 'checkPerson',
          {
            email:email ,
            pubgId :pubgId ,
            pubgIdFirstMember:pubgIdFirstMember,
            pubgIdSecondMember:pubgIdSecondMember,
            pubgIdThirdMember:pubgIdThirdMember,
            playerPhone:phone
          }
        )
        .subscribe((data:{existEmail:boolean , existIdPubg:boolean ,firstBlackList:boolean,secondBlackList:boolean,thirdBlackList:boolean , existPhone:boolean, random:number})=>{
          if(data.random == null){
            observer.next({existEmail:data.existEmail , existIdPubg:data.existIdPubg ,firstBlackList:data.firstBlackList,secondBlackList:data.secondBlackList,thirdBlackList:data.thirdBlackList , existPhone:data.existPhone});
            observer.complete();
          }
          else{
            this.formAdded = {
              email:email,
              pubgId : pubgId,
              firstMemberPubgId:pubgIdFirstMember,
              secondMemberPubgId:pubgIdSecondMember,
              thirdMemberPubgId:pubgIdThirdMember,
              playerPhone:phone,
              videoId:videoId,
              code:null
            };
            this.random = data.random;
            this.route.navigate(['/register/squadteamleaderconfirmEmail']);
          }
        }, error => {this.dialog.open(ErrorComponent)})
      })
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
      return this.http.post<{message:string}>(BACKEND_URL + 'tLSendData',this.formAdded)
    }
    else{
      return new Observable<{message:string}>( observer => {
        observer.next( {message:"error occure please register again"})
        observer.complete()
     })
    } 
  }
  
  /*member*/
  getMemberVideoIdAndRegisterType():Observable<object>{
    return this.http.post<{register : boolean,videoId : string,videoType : string, adAppearanceCountry:string , phone:boolean}>(BACKEND_URL + 'memberReGetAd',{send:true});
  }
  getMemberEmail(
    Email:string,
    pubgId:number,
    teamLeaderIdpubg:number,
    phone:string){
      return new Observable(observer => {
        this.http.post<{random:number,checkEmail:boolean ,checkIdPubg:boolean , checkTeamleaderIdPubg:boolean, checkExistsBefore:boolean , checkPhone:boolean , error:boolean,PlaceIdPubg:string}>(BACKEND_URL + 'sendMemberEmailConfirm',{Email : Email, pubgId : pubgId , teamLeaderIdpubg : teamLeaderIdpubg , playerPhone:phone})
        .subscribe(data=>{
          this.memberRandom = data.random;
          this.placeIdPubg =data.PlaceIdPubg;
          if(data.random != null){
            observer.next({checkEmail:false , checkIdPubg:false , checkTeamleaderIdPubg:false , checkExistsBefore:false , checkPhone:false , error:false});
            observer.complete();
          }
          else{
            observer.next({checkEmail:data.checkEmail , checkIdPubg:data.checkIdPubg , checkTeamleaderIdPubg:data.checkTeamleaderIdPubg , checkExistsBefore:data.checkExistsBefore , checkPhone:data.checkPhone , error:data.error});
            observer.complete();
          }
        });
      })
  }
  confirmMemberEmail(
    Email:string,
    pubgId:string,
    teamLeaderIdpubg:string,
    phone:string,
    videoId:string){
      this.memberFormAdded = {
        email:Email,
        pubgId : pubgId,
        memberPubgId:teamLeaderIdpubg,
        placeIdPubg:this.placeIdPubg,
        playerPhone: phone,
        videoId:videoId,
        code:null
      };
      this.route.navigate(['/register/squadmemberconfirmEmail']);
  }
  getMemberFormAddedAndRandom(){
    if(this.memberFormAdded == null || this.memberRandom == null){
      return false;
    }
    else{
      return true;
    }
  }
  checkMemberRandom(randon:number){
    if(randon == this.memberRandom){
      return true;
    }
    else{
      return false;
    }
  }
  deleteMemberRandom(){
    this.memberFormAdded = null;
    this.memberRandom = null
  }
  sendMemberData(randon:number){
    if(randon == this.memberRandom && this.memberRandom != null){
      this.memberFormAdded.code = randon;
      return this.http.post<{message:string}>(BACKEND_URL + 'mSendData',this.memberFormAdded) 
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
    return this.http.post<{dateAppearance : boolean,videoId : string,videoType : string , adAppearanceCountry:string}>(BACKEND_URL + 'dateGetAd',{send:true});
  }

  getPlayerDate(idPubg:string){
    return  this.http.post<{date:string , time:number,message:string}>(BACKEND_URL + 'getPlayerDate',{idpubg:idPubg});
  }
  /*free ad*/
  getVideoIdAndFreeAdType():Observable<object>{
    return this.http.post<{freeAdResgister : boolean,videoId : string,videoType : string , adAppearanceCountry:string,adsWillAppear:Array<string>}>(BACKEND_URL + 'freeAdGetAd',{send:true});
  }
  checkPersonFreeAd(
    email:string,
    youtube:string,
    country:string,
    videoId:string){
      return new Observable(observer => {
        this.http.post<{existEmail:boolean , existyoutubeVideoId:boolean , random:number}>(BACKEND_URL + 'checkPersonFreeAd',{email:email , youtube :youtube})
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
            this.route.navigate(['/register/squadconfirmEmailFreeAd']);
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
      return this.http.post<{message:string}>(BACKEND_URL + 'sendDataFreeAd',this.freeAd) 
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
    return this.http.post<{reportHackerResgister : boolean,apperHackerAndWinners:boolean}>(BACKEND_URL + 'reportHackerRegister',{send:true});
  }
  checkPersonHacker(
    email:string,
    googleDrive:string){
      return new Observable(observer => {
        this.http.post<{existEmail:boolean , existGoogleDrive:boolean , random:number}>(BACKEND_URL + 'checkPersonHacker',{email:email , googleDrive :googleDrive})
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
            this.route.navigate(['/register/squadconfirmEmailHacker']);
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
      return this.http.post<{message:string}>(BACKEND_URL + 'sendDataHacker',this.reportHacker) 
    }
    else{
      return new Observable<{message:string}>( observer => {
        observer.next( {message:"error occure please register again"})
        observer.complete()
     })
    }
  }
  getPlayerState(idPubg:string){
    return this.http.post<string>(BACKEND_URL + 'getPlayerState',{idpubg:idPubg});
  }
}