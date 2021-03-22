import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgModel} from '@angular/forms';
import {DuobodyService} from '../../duobody.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {ErrorComponent} from '../../../error/error.component';

@Component({
  selector: 'app-duoreportthehacker',
  templateUrl: './duoreportthehacker.component.html',
  styleUrls: ['./duoreportthehacker.component.css']
})
export class DuoreportthehackerComponent implements OnInit ,OnDestroy{
  constructor(private duoBodyService:DuobodyService , private dialog:MatDialog) { }
  public register:boolean = false;
  public appearHackerAndWinners:boolean = false;
  public upVideo:string;
  public getDataOnServer:boolean = true;
  public message:string = 'Your status will appear here';
  public disbaleBottom:boolean = false;
  public numberClickShowDate:number = 0;
  public disableButton:boolean = false;
  public gmailAccountType:boolean = true;
  public errorServerGmailAccountType:boolean = false;
  public googleDriveType:boolean = true;
  public errorServerGoogleDriveType:boolean = false;
  public pubgIdText:string = "your id account in pubg";
  public registerState:string = "Register";
  private checkRegisterType:Subscription;
  private checkPersonHacker:Subscription;
  private showPlayerStateType:Subscription;

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.checkRegisterType = this.duoBodyService.getReportHackerType().subscribe((data:{reportHackerResgister : boolean,apperHackerAndWinners:boolean}) =>{
      let _this = this;
      setTimeout(function () {
        _this.getDataOnServer = false;
      },3000);
      this.register = data.reportHackerResgister;
      this.appearHackerAndWinners = data.apperHackerAndWinners;
      if(data.apperHackerAndWinners == true)
      {
        this.upVideo = "the hackers and the winners in last round";
      }
      else if(data.reportHackerResgister == true){
        this.upVideo = "registration is open";
      }
      else{
        this.upVideo = "sorry the registration has finished";
      }
    },error => {this.dialog.open(ErrorComponent)})
  }

  addReportHacker(personHackerForm:any)
  {
    this.disableButton = true;
    this.registerState = "please wait";
    this.errorServerGmailAccountType = false;
    this.errorServerGoogleDriveType = false;
    this.gmailAccountType = true;
    this.googleDriveType = true;
    let filteGmailAccont = personHackerForm.value.Email.toLowerCase().split('.').join('').replace('@gmailcom','@gmail.com');
    this.checkPersonHacker = this.duoBodyService.checkPersonHacker(filteGmailAccont , personHackerForm.value.googleDrive)
    .subscribe((data:{existEmail:boolean , existGoogleDrive:boolean})=>{
      if(data.existEmail == false && data.existGoogleDrive == false){
        this.errorServerGmailAccountType = true;
        this.errorServerGoogleDriveType = true;
        personHackerForm.form.controls.Email.status = "INVALID";
        personHackerForm.form.controls.googleDrive.status = "INVALID";
        personHackerForm.form.status = "INVALID";
      }
      else if(data.existEmail == true && data.existGoogleDrive == true)
      {
        this.gmailAccountType = false;
        this.googleDriveType = false;
        personHackerForm.form.controls.Email.status = "INVALID";
        personHackerForm.form.controls.googleDrive.status = "INVALID";
        personHackerForm.form.status = "INVALID";
      }
      else if(data.existEmail == false && data.existGoogleDrive == true)
      {
        this.googleDriveType = false;
        personHackerForm.form.controls.googleDrive.status = "INVALID";
        personHackerForm.form.status = "INVALID";
      }
      else{
        this.gmailAccountType = false;
        personHackerForm.form.controls.Email.status = "INVALID";
        personHackerForm.form.status = "INVALID";
      }
      this.registerState = "Register";
      this.disableButton = false;
    })
  }
  showPlayerState(idPubg:NgModel,target:HTMLElement){
    this.disbaleBottom = true;
    this.pubgIdText = 'Please wait after completing your pubg id';
    this.numberClickShowDate++;
    if(this.numberClickShowDate<=6)
    {
      this.showPlayerStateType =  this.duoBodyService.getPlayerState(idPubg.control.value).subscribe((message)=>{
        this.disbaleBottom = false;
        this.pubgIdText = 'your id account in pubg';
        this.message = message
        target.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
      });
    }
    else{
      this.message = "you click in show date buttom a lot of times refresh the page to click again";
      this.pubgIdText = 'your id account in pubg';
    }
  }


  ngOnDestroy():void{
    if(this.checkRegisterType){
      this.checkRegisterType.unsubscribe();
    }
    if(this.checkPersonHacker){
      this.checkPersonHacker.unsubscribe();
    }
    if(this.showPlayerStateType){
      this.showPlayerStateType.unsubscribe();
    }
  }
}

