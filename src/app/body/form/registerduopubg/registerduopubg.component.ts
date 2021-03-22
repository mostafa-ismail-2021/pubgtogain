import { Component, OnInit, OnDestroy,NgZone } from '@angular/core';
import {DuobodyService} from '../../duobody.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {ErrorComponent} from '../../../error/error.component';
import {
  OnPageVisibilityChange,
  AngularPageVisibilityStateEnum} from 'angular-page-visibility';

@Component({
  selector: 'app-registerduopubg',
  templateUrl: './registerduopubg.component.html',
  styleUrls: ['./registerduopubg.component.css']
})
export class RegisterduopubgComponent implements OnInit , OnDestroy {

  constructor(private duoBodyService:DuobodyService , private dialog:MatDialog,private ngZone: NgZone) { }
  public YT: any;
  public player: any;
  public reframed: boolean = false;
  public videoFinish :boolean = false;
  public register:boolean = false;
  public upVideo:string;
  public gmailAccountType:boolean = true;
  public errorServerGmailAccountType:boolean = false;
  public disableButton:boolean = false;
  public idPubgType:boolean = true;
  public errorServerIdPubgType:boolean = false;
  public memberIdPubgType:boolean = false;
  public errorServerMemberIdPubgType:boolean = false;
  public getDataOnServer:boolean = true;
  public memberBlackList:boolean = false;
  public registerState:string = "register";
  public phonePlayer = false;
  public phoneType:boolean = true;
  public errorServerPhoneType:boolean = false;
  private videoType:string;
  private videoId:string;
  private adAppearanceCountry:string;
  private checkPerson:Subscription;
  private checkVideoIdAndRegisterType:Subscription;
  private videoReady:boolean = false;
  private playercount:number = 0;

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.checkVideoIdAndRegisterType = this.duoBodyService.getVideoIdAndRegisterType().subscribe((data:{register:boolean , videoId:string , videoType:string , adAppearanceCountry:string ,phone:boolean}) =>{
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
      this.videoId = data.videoId
      this.videoType = data.videoType;
      this.adAppearanceCountry = data.adAppearanceCountry;
      this.phonePlayer = data.phone;
    },error => {this.dialog.open(ErrorComponent)})
  }
  addVideo() {
    let $this = this;
    this.playercount++;
    setTimeout(function () {
      if(document.getElementById('duoplayer') != null || $this.playercount > 60)
      {
        try{
          $this.init();
          if(window['onYouTubeIframeAPIReady'] == undefined)
          {
            window['onYouTubeIframeAPIReady'] = (e) => {
              $this.YT = window['YT'];
              $this.reframed = false;
              $this.player = new window['YT'].Player('duoplayer', {
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
            $this.player = new window['YT'].Player('duoplayer', {
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
  addPerson(form:any)
  {
    this.disableButton = true;
    this.registerState = "please wait";
    this.errorServerGmailAccountType = false;
    this.errorServerIdPubgType = false;
    this.errorServerMemberIdPubgType = false;
    this.gmailAccountType = true;
    this.idPubgType = true;
    this.memberIdPubgType = false;
    this.memberBlackList = false;
    this.phoneType = true;
    let phone:string;
    if(this.phonePlayer == true){
      phone = form.value.phone;
    }
    else{
      phone = "00000000000";
    }
    if(form.value.Idpubg != form.value.memberIdpubg)
    {
      let email = form.value.Email.toLowerCase().split('.').join('').replace('@gmailcom','@gmail.com');
      this.checkPerson = this.duoBodyService.checkPerson(email , form.value.Idpubg , form.value.memberIdpubg , phone , this.videoId)
      .subscribe((data:{existEmail:boolean , existIdPubg:boolean , memberBlackList:boolean , existPhone:boolean})=>{
        if(this.phonePlayer == true && data.existEmail == false && data.existIdPubg == false && data.memberBlackList == false && data.existPhone == false){
          this.errorServerGmailAccountType = true;
          this.errorServerIdPubgType = true;
          this.errorServerMemberIdPubgType = true;
          this.errorServerPhoneType = true;
          form.form.controls.Email.status = "INVALID";
          form.form.controls.Idpubg.status = "INVALID";
          form.form.controls.memberIdpubg.status = "INVALID";
          form.form.controls.phone.status = "INVALID";
          form.form.status = "INVALID";
        }
        if(this.phonePlayer == false && data.existEmail == false && data.existIdPubg == false && data.memberBlackList == false){
          this.errorServerGmailAccountType = true;
          this.errorServerIdPubgType = true;
          this.errorServerMemberIdPubgType = true;
          form.form.controls.Email.status = "INVALID";
          form.form.controls.Idpubg.status = "INVALID";
          form.form.controls.memberIdpubg.status = "INVALID";
          form.form.status = "INVALID";
        }
        if(this.phonePlayer == true && data.existPhone == true){
          this.phoneType = false;
          form.form.controls.phone.status = "INVALID";
          form.form.status = "INVALID";
        }
        if(data.existEmail == true){
          this.gmailAccountType = false;
          form.form.controls.Email.status = "INVALID";
          form.form.status = "INVALID";
        }
        if(data.existIdPubg == true)
        {
          this.idPubgType = false;
          form.form.controls.Idpubg.status = "INVALID";
          form.form.status = "INVALID";
        }
        if(data.memberBlackList == true)
        {
          this.memberBlackList = true;
          form.form.controls.memberIdpubg.status = "INVALID";
          form.form.status = "INVALID";
        }
        this.registerState = "register";
        this.disableButton = false;
      })
    }
    else{
      this.memberIdPubgType = true;
      form.form.controls.memberIdpubg.status = "INVALID";
      form.form.status = "INVALID";
      this.registerState = "register";
      this.disableButton = false;
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
            this.duoBodyService.increaseVideoFinish(this.videoId , this.videoType,this.adAppearanceCountry);
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
    if(this.checkPerson){
      this.checkPerson.unsubscribe();
    }
  }
}