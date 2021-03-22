import { Component, OnInit , OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import {admincharityads} from './admincharityads.service';
import { MatDialog } from '@angular/material/dialog';
import {ErrorComponent} from '../../error/error.component';

@Component({
  selector: 'app-admincharityads',
  templateUrl: './admincharityads.component.html',
  styleUrls: ['./admincharityads.component.css']
})
export class AdmincharityadsComponent implements OnInit ,OnDestroy {

  constructor(private admincharityads:admincharityads , private dialog:MatDialog) { }

  messageAddCharityAd:string = null;
  numberCharityAds:number = null;
  messageDeleteCharityAds:string = null;
  disableButton:boolean = false;
  confirmRequest:string = "test";
  private checkAddCharityAdType:Subscription;
  private checkGetCharityAdsType:Subscription;
  private checkDeleteCharityAdType:Subscription;
  ngOnInit(): void {
  }
  addCharityAdToServer(addCharityAdForm:NgForm){
    this.disableButton = true;
    let videoId = addCharityAdForm.value.videoId.split("/").pop();
    let charityAdData ={
      videoId:videoId,
      adAppearanceCountry:addCharityAdForm.value.adAppearanceCountry,
    }
    this.checkAddCharityAdType = this.admincharityads.addCharityAdToServer(charityAdData,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageAddCharityAd = data.message;
      this.disableButton = false;
    });
  }
  getCharityAds(){
    this.disableButton = true;
    let charityAds:Array<object> = null;
    this.checkGetCharityAdsType = this.admincharityads.getCharityAds(this.confirmRequest)
    .subscribe((data:Array<object>)=>{
      charityAds = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      this.numberCharityAds = charityAds.length;
      console.log(charityAds);
      this.disableButton = false;
    })
  }
  deleteCharityAd(deleteCharityAdForm:NgForm){
    this.disableButton = true;
    this.checkDeleteCharityAdType = this.admincharityads.deleteCharityAd(deleteCharityAdForm.value._id,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageDeleteCharityAds = data.message;
      this.disableButton = false;
    });
  }
  openButtons(){
    this.disableButton = false;
  }
  ngOnDestroy(): void {
    if(this.checkAddCharityAdType){
      this.checkAddCharityAdType.unsubscribe();
    }
    if(this.checkGetCharityAdsType){
      this.checkGetCharityAdsType.unsubscribe();
    }
    if(this.checkDeleteCharityAdType){
      this.checkDeleteCharityAdType.unsubscribe();
    }
  }
}
