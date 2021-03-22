import { Component, OnInit, OnDestroy,NgZone} from '@angular/core';
import { NgModel} from '@angular/forms';
import {SquadbodyService} from '../../body/squadbody.service';
import { Subscription, from } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {ErrorComponent} from '../../error/error.component';
import {
  OnPageVisibilityChange,
  AngularPageVisibilityStateEnum,
  } from 'angular-page-visibility';

@Component({
  selector: 'app-squadpubg',
  templateUrl: './squadpubg.component.html',
  styleUrls: ['./squadpubg.component.css']
})
export class SquadpubgComponent implements OnInit , OnDestroy{

  constructor(private squadBodyService:SquadbodyService , private dialog:MatDialog,private ngZone: NgZone) { }

  public YT: any;
  public player: any;
  public reframed: boolean = false;
  public videoFinish :boolean = false;
  public dateAppearance:boolean = false;
  public disableButton:boolean = false;
  public upVideo:string;
  public detailDate:string;
  public date:string=null;
  public timeGrinch:string=null;
  public timeEgypt:string=null;
  public numberClickShowDate:number = 0;
  public pubgIdText:string='your id account in pubg';
  public getDataOnServer:boolean = true;
  private videoType:string;
  private videoId:string;
  private adAppearanceCountry:string;
  private getVideoIdAndRegisterType:Subscription;
  private showDateType:Subscription;
  private videoReady:boolean = false;
  private playercount:number = 0;

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getVideoIdAndRegisterType = this.squadBodyService.getVideoIdAndDateType().subscribe((data:{dateAppearance:boolean , videoId:string , videoType:string , adAppearanceCountry:string}) =>{
      let _this = this;
      setTimeout(function () {
        _this.getDataOnServer = false;
        _this.addVideo();
      },3000);
      this.dateAppearance = data.dateAppearance;
      if(this.dateAppearance == true)
      {
        this.upVideo = "the video will start now";
        this.detailDate = "The date will appear here";
      }
      else{
        this.upVideo = "sorry There is no display date now";
        this.detailDate = "no date to display";
      }
      this.videoId = data.videoId //video id
      this.videoType = data.videoType;
      this.adAppearanceCountry = data.adAppearanceCountry;
    },error => {this.dialog.open(ErrorComponent)})
  }
  addVideo() {
    let $this = this;
    this.playercount++;
    setTimeout(function () {
      if(document.getElementById('squaddateplayer') != null || $this.playercount > 60)
      {
        try{
          $this.init();
          if(window['onYouTubeIframeAPIReady'] == undefined)
          {
            window['onYouTubeIframeAPIReady'] = (e) => {
              $this.YT = window['YT'];
              $this.reframed = false;
              $this.player = new window['YT'].Player('squaddateplayer', {
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
            $this.player = new window['YT'].Player('squaddateplayer', {
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
    if(this.dateAppearance == true)
    {
      this.upVideo = "The video will disappear from the screen after it is completed";
    }
    event.target.playVideo();
    this.player.unMute();
    this.player.setVolume(65);
    this.videoReady = true;
  }

  onPlayerStateChange(event) {
    this.ngZone.run(() => {
    switch (event.data) {
      case window['YT'].PlayerState.ENDED:
        this.videoFinish = true;
        if(this.dateAppearance == true)
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
  
  showDate(idPubg:NgModel,target:HTMLElement){
    this.disableButton = true;
    this.pubgIdText = 'Please wait after completing your pubg id';
    this.numberClickShowDate++;
    if(this.numberClickShowDate<=6)
    {
      this.showDateType =  this.squadBodyService.getPlayerDate(idPubg.control.value).subscribe((data:{date:string , time:number,message:string})=>{
        this.disableButton = false;
        this.pubgIdText = 'your id account in pubg';
        this.detailDate = data.message
        if(data.date != null && data.time != null)
        {
          this.date = "date: " + data.date;
          this.timeEgypt ="time: " + data.time + " Egyptian time";
          this.timeGrinch = "time: " + (data.time-2) + " GMT(Greenwich time)";
        }
        else{
          this.date = null;
          this.timeEgypt = null;
          this.timeGrinch = null;
        }
        if(data.message == "your next round will start in")
        {
          target.scrollIntoView({behavior:"smooth"});
          //target.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        }
      });
    }
    else{
      this.detailDate = "you click in show date buttom a lot of times refresh the page to click again";
      this.pubgIdText = 'your id account in pubg';
      this.date = null;
      this.timeEgypt = null;
      this.timeGrinch = null;
    }
  }

  ngOnDestroy():void{
    if(this.getVideoIdAndRegisterType){
      this.getVideoIdAndRegisterType.unsubscribe();
    }
    if(this.showDateType){
      this.showDateType.unsubscribe();
    }
  }
}
