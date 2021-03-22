import { Component, OnInit, OnDestroy,NgZone } from '@angular/core';
import {SquadbodyService} from '../../squadbody.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {ErrorComponent} from '../../../error/error.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  OnPageVisibilityChange,
  AngularPageVisibilityStateEnum} from 'angular-page-visibility';

@Component({
  selector: 'app-free-ad-squad-pubg',
  templateUrl: './free-ad-squad-pubg.component.html',
  styleUrls: ['./free-ad-squad-pubg.component.css']
})
export class FreeAdSquadPubgComponent implements OnInit ,OnDestroy{

  
  constructor(private squadBodyService:SquadbodyService , private dialog:MatDialog,private ngZone: NgZone,private dom:DomSanitizer) { }
  public YT: any;
  public player: any;
  public reframed: boolean = false;
  public videoFinish :boolean = false;
  public register:boolean = false;
  public upVideo:string;
  public selectcountry:boolean = true;
  public selectedValue:string = 'EG';
  public errorServerGmailAccountType:boolean = false;
  public errorServerYoutubeType:boolean = false;
  public displayAdsWillAppear:Array<SafeResourceUrl> = [];
  public getDataOnServer:boolean = true;
  public disableButton:boolean = false;
  public gmailAccountType:boolean = true;
  public youtubeType:boolean = true;
  public registerState:string = "register";
  private videoType:string;
  private videoId:string;
  private adAppearanceCountry:string;
  private checkPersonFreeAd:Subscription;
  private checkVideoIdAndRegisterType:Subscription;
  private videoReady:boolean = false;
  private playercount:number = 0;


  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.checkVideoIdAndRegisterType = this.squadBodyService.getVideoIdAndFreeAdType().subscribe((data:{freeAdResgister:boolean , videoId:string , videoType:string , adAppearanceCountry:string,adsWillAppear:Array<string>}) =>{
      let _this = this;
      setTimeout(function () {
        _this.getDataOnServer = false;
        _this.addVideo(data.adsWillAppear.length);
      },3000);
      if(data.adsWillAppear.length == 0){
        this.register = data.freeAdResgister;
        if(this.register == true)
        {
          this.upVideo = "the video will start now";
        }
        else{
          this.upVideo = "sorry registration has finished";
        }
        this.videoId = data.videoId //video id
        this.videoType = data.videoType;
        this.adAppearanceCountry = data.adAppearanceCountry;
      }
      else{
        for (let index = 0; index < data.adsWillAppear.length; index++) {
          this.displayAdsWillAppear.push(this.dom.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+data.adsWillAppear[index]))
        }
      }
    },error => {this.dialog.open(ErrorComponent)})
  }
  addVideo(length:number) {
    let $this = this;
    this.playercount++;
    setTimeout(function () {
      if(length == 0 && (document.getElementById('solofreeplayer') != null || $this.playercount > 60))
      {
        try{
          $this.init();
          if(window['onYouTubeIframeAPIReady'] == undefined)
          {
            window['onYouTubeIframeAPIReady'] = (e) => {
              $this.YT = window['YT'];
              $this.reframed = false;
              $this.player = new window['YT'].Player('solofreeplayer', {
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
            $this.player = new window['YT'].Player('solofreeplayer', {
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
      else if(length == 0){
        $this.addVideo(length);
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
      === AngularPageVisibilityStateEnum[AngularPageVisibilityStateEnum.VISIBLE] && this.videoReady && !this.videoFinish && this.displayAdsWillAppear.length == 0) {
      this.player.playVideo();
    } else if (AngularPageVisibilityStateEnum[visibilityState]
      === AngularPageVisibilityStateEnum[AngularPageVisibilityStateEnum.HIDDEN] && this.videoReady && !this.videoFinish && this.displayAdsWillAppear.length == 0) {
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

  addFreeAd(personFreeAdsForm:any)
  {
    this.disableButton = true;
    this.registerState = "please wait";
    this.errorServerGmailAccountType = false;
    this.errorServerYoutubeType = false;
    this.gmailAccountType = true;
    this.youtubeType = true;
    if(this.selectcountry){
      this.selectedValue = "ALL";
    }
    let email = personFreeAdsForm.value.Email.toLowerCase().split('.').join('').replace('@gmailcom','@gmail.com');
    let youtube = personFreeAdsForm.value.youtube.split("/").pop();
    this.checkPersonFreeAd = this.squadBodyService.checkPersonFreeAd(email , youtube , this.selectedValue , this.videoId)
    .subscribe((data:{existEmail:boolean , existyoutubeVideoId:boolean})=>{
      if(data.existEmail == false && data.existyoutubeVideoId == false){
        this.errorServerGmailAccountType = true;
        this.errorServerYoutubeType = true;
        personFreeAdsForm.form.controls.Email.status = "INVALID";
        personFreeAdsForm.form.controls.youtube.status = "INVALID";
        personFreeAdsForm.form.status = "INVALID";
      }
      else if(data.existEmail == true && data.existyoutubeVideoId == true)
      {
        this.gmailAccountType = false;
        this.youtubeType = false;
        personFreeAdsForm.form.controls.Email.status = "INVALID";
        personFreeAdsForm.form.controls.youtube.status = "INVALID";
        personFreeAdsForm.form.status = "INVALID";
      }
      else if(data.existEmail == false && data.existyoutubeVideoId == true)
      {
        this.youtubeType = false;
        personFreeAdsForm.form.controls.youtube.status = "INVALID";
        personFreeAdsForm.form.status = "INVALID";
      }
      else{
        this.gmailAccountType = false;
        personFreeAdsForm.form.controls.Email.status = "INVALID";
        personFreeAdsForm.form.status = "INVALID";
      }
      this.registerState = "register";
      this.disableButton = false;
    })
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
        //console.log('' + this.video)
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    };
    
  };
  ngOnDestroy():void{
    if(this.checkPersonFreeAd){
      this.checkPersonFreeAd.unsubscribe();
    }
    if(this.checkVideoIdAndRegisterType){
      this.checkVideoIdAndRegisterType.unsubscribe();
    }
  }
}

