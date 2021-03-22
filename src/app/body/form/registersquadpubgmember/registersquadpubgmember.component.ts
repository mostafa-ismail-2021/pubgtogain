import { Component, OnInit, OnDestroy,NgZone } from '@angular/core';
import {SquadbodyService} from '../../squadbody.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {ErrorComponent} from '../../../error/error.component';
import {
  OnPageVisibilityChange,
  AngularPageVisibilityStateEnum} from 'angular-page-visibility';

@Component({
  selector: 'app-registersquadpubgmember',
  templateUrl: './registersquadpubgmember.component.html',
  styleUrls: ['./registersquadpubgmember.component.css']
})
export class RegistersquadpubgmemberComponent implements OnInit ,OnDestroy {

  constructor(private squadBodyService:SquadbodyService , private dialog:MatDialog,private ngZone: NgZone) { }
  public YT: any;
  public player: any;
  public reframed: boolean = false;
  public videoFinish :boolean = false;
  public register:boolean = false;
  public upVideo:string;
  public idPubgType:boolean = false;
  public errorServerIdPubgType:boolean = false;
  public memberIdPubgType:boolean = false;
  public gmailAccountType:boolean = false;
  public errorServerGmailAccountType:boolean = false;
  public disableButton:boolean = false;
  public memberRegisterExistsBefore:boolean = false;
  public getDataOnServer:boolean = true;
  public registerState:string = "register";
  public phonePlayer = false;
  public phoneType:boolean = true;
  public errorServerPhoneType:boolean = false;
  private videoType:string;
  private videoId:string;
  private adAppearanceCountry:string;
  private checkVideoIdAndRegisterType:Subscription;
  private checkMemberPerson:Subscription;
  private videoReady:boolean = false;
  private click:number = 0;
  private playercount:number = 0;
  
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.checkVideoIdAndRegisterType = this.squadBodyService.getMemberVideoIdAndRegisterType().subscribe((data:{register:boolean , videoId:string , videoType:string , adAppearanceCountry:string,phone:boolean}) =>{
      let _this = this;
      setTimeout(function () {
        _this.getDataOnServer = false;
        _this.addVideo();
      },3000);
      this.register = data.register;
      if(this.register == true)
      {
        this.upVideo = "the video will start now";
      }
      else{
        this.upVideo = "sorry, registration has finished";
      }
      this.videoId = data.videoId //video id
      this.videoType = data.videoType;
      this.adAppearanceCountry = data.adAppearanceCountry;
      this.phonePlayer = data.phone;
    },error => {this.dialog.open(ErrorComponent)})
  }
  addVideo() {
    let $this = this;
    this.playercount++;
    setTimeout(function () {
      if(document.getElementById('squadmemberplayer') != null || $this.playercount > 60)
      {
        try{
          $this.init();
          if(window['onYouTubeIframeAPIReady'] == undefined)
          {
            window['onYouTubeIframeAPIReady'] = (e) => {
              $this.YT = window['YT'];
              $this.reframed = false;
              $this.player = new window['YT'].Player('squadmemberplayer', {
                videoId: $this.videoId,
                playerVars: { 
                  'autoplay': 1,
                  'controls': 0,
                  'rel' : 0,
                  'fs' : 0,
                },
                events: {
                  'onReady': $this.onPlayerReady.bind($this),
                  'onStateChange': $this.onPlayerStateChange.bind($this),
                  'onError': $this.onPlayerError.bind($this),
                }
              });
            };
          }
          else{
            $this.YT = window['YT'];
            $this.reframed = false;
            $this.player = new window['YT'].Player('squadmemberplayer', {
              videoId: $this.videoId,
              playerVars: { 
                'autoplay': 1,
                'controls': 0,
                'rel' : 0,
                'fs' : 0,
              },
              events: {
                'onReady': $this.onPlayerReady.bind($this),
                'onStateChange': $this.onPlayerStateChange.bind($this),
                'onError': $this.onPlayerError.bind($this),
              }
            });
          }
        }
        catch(e){
          $this.dialog.open(ErrorComponent);
        }
      }
      else{
        $this.addVideo();
      }
    }, 1000);
  }
  init() {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
  
  @OnPageVisibilityChange()
  logWhenPageVisibilityChange ( visibilityState: AngularPageVisibilityStateEnum ): void {
    if ( AngularPageVisibilityStateEnum[visibilityState]
      === AngularPageVisibilityStateEnum[AngularPageVisibilityStateEnum.VISIBLE] && this.videoReady && !this.videoFinish) {
      this.player.playVideo();
    } else if (AngularPageVisibilityStateEnum[visibilityState]
      === AngularPageVisibilityStateEnum[AngularPageVisibilityStateEnum.HIDDEN] && this.videoReady && !this.videoFinish) {
      this.player.pauseVideo();
    }
  }

  onPlayerReady(event){
    if(this.register == true)
    {
      this.upVideo = "The video will disappear from the screen after it is completed";
    }
    event.target.playVideo();
    this.player.unMute();
    this.player.setVolume(65);
    this.videoReady = true;
  }
  addMemberPerson(form:any,target:HTMLElement)
  {
    if(this.click <= 6){
      this.disableButton = true;
      this.click++;
      this.registerState = "please wait";
      this.errorServerIdPubgType = false;
      this.errorServerGmailAccountType = false;
      this.gmailAccountType = false;
      this.idPubgType = false;
      this.memberIdPubgType = false;
      let phone:string;
      if(this.phonePlayer == true){
        phone = form.value.phone;
      }
      else{
        phone = "00000000000";
      }
      let email = form.value.Email.toLowerCase().split('.').join('').replace('@gmailcom','@gmail.com');
      this.checkMemberPerson = this.squadBodyService.getMemberEmail(
        email,
        form.form.value.Idpubg,
        form.form.value.teamLeaderIdpubg,
        phone
        ).subscribe((data:{checkEmail:boolean , checkIdPubg:boolean ,checkTeamleaderIdPubg:boolean , checkExistsBefore:boolean , checkPhone:boolean ,error:boolean}) =>{
          if(data.error){
            this.disableButton = false;
            this.errorServerIdPubgType = true;
            form.form.controls.Idpubg.status = "INVALID";
            form.form.status = "INVALID";
          }
          else if(data.checkExistsBefore)
          {
            this.disableButton = false;
            this.memberRegisterExistsBefore = true;
            form.form.controls.Idpubg.status = "INVALID";
            form.form.status = "INVALID";
          }
          else if(data.checkIdPubg){
            this.disableButton = false;
            this.idPubgType = true;
            form.form.controls.Idpubg.status = "INVALID";
            form.form.status = "INVALID";
          }
          else if(data.checkTeamleaderIdPubg){
            this.disableButton = false;
            this.memberIdPubgType = true;
            form.form.controls.teamLeaderIdpubg.status = "INVALID";
            form.form.status = "INVALID";
          }
          else if(!data.checkIdPubg && !data.checkTeamleaderIdPubg && !data.checkEmail && !data.checkPhone){
            this.squadBodyService.confirmMemberEmail(
              email ,
              form.form.value.Idpubg,
              form.form.value.teamLeaderIdpubg,
              phone,
              this.videoId,
            );
          }
          if(data.checkEmail){
            this.disableButton = false;
            this.gmailAccountType = true;
            form.form.controls.Email.status = "INVALID";
            form.form.status = "INVALID";
          }
          if(this.phonePlayer == true && data.checkPhone){
            this.disableButton = false;
            this.phoneType = false;
            form.form.controls.phone.status = "INVALID";
            form.form.status = "INVALID";
          }
          this.registerState = "Register";
      })
    }
    else{
      this.register = false;
      this.upVideo = 'you click in Register button too much so the register stopped';
      target.scrollIntoView({behavior:"smooth"});
    }
  }
  onPlayerStateChange(event) {
    this.ngZone.run(() => {
    switch (event.data) {
      case window['YT'].PlayerState.ENDED:
        this.videoFinish = true;
        if(this.register == true)
        {
          this.upVideo = "Thanks for waiting for the video to finish";
        }
        if(this.videoType != "noType"){
          this.squadBodyService.increaseVideoFinish(this.videoId , this.videoType,this.adAppearanceCountry);
        }
      break;
    };
  });
  };

  onPlayerError(event) {
    switch (event.data) {
      case 2:
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    };
    
  };
  
  ngOnDestroy():void{
    if(this.checkVideoIdAndRegisterType){
      this.checkVideoIdAndRegisterType.unsubscribe();
    }
    if(this.checkMemberPerson)
    {
      this.checkMemberPerson.unsubscribe();
    }
  }
}
