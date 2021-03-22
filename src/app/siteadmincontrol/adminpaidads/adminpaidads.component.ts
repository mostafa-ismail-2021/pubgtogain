import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import {adminpaidad} from './adminpaidad.service';
import { MatDialog } from '@angular/material/dialog';
import {ErrorComponent} from '../../error/error.component';
@Component({
  selector: 'app-adminpaidads',
  templateUrl: './adminpaidads.component.html',
  styleUrls: ['./adminpaidads.component.css']
})
export class AdminpaidadsComponent implements OnInit ,OnDestroy {

  constructor(private adminpaidad:adminpaidad , private dialog:MatDialog) { }
  messageAddPaidAd:string = null;
  numberPaidAds:number = null;
  numberPaidAdsNot:number = null;
  messageDeletePaidAds:string = null;
  numberPaidAdsCompany:number = null;
  messagePaidComTrue:string = null;
  disableButton:boolean = false;
  numberPaidAdsComFalse:number = null;
  confirmRequest:string = "test";
  private checkAddPaidAdType:Subscription;
  private checkPaidAdsType:Subscription;
  private checkPaidAdsNotType:Subscription;
  private checkDeletePaidAdsType:Subscription;
  private checkPaidAdsCompanyType:Subscription;

  ngOnInit(): void {
  }
  addPaidAdToServer(addPaidAdForm:NgForm){
    this.disableButton = true;
    let videoId = addPaidAdForm.value.videoId.split("/").pop();
    let paidAdData ={
      videoId:videoId,
      totalViews:addPaidAdForm.value.totalViews,
      companyName:addPaidAdForm.value.companyName,
      costByEGP:addPaidAdForm.value.costByEGP,
      adAppearanceCountry:addPaidAdForm.value.adAppearanceCountry,
    }
    this.checkAddPaidAdType = this.adminpaidad.addPaidAdToServer(paidAdData,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageAddPaidAd = data.message;
      this.disableButton = false;
    });
  }
  getPaidAds(){
    this.disableButton = true;
    let paidAds:Array<object> = null;
    this.checkPaidAdsType = this.adminpaidad.getPaidAds(this.confirmRequest)
    .subscribe((data:Array<object>)=>{
      paidAds = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      this.numberPaidAds = paidAds.length;
      console.log(paidAds);
      this.disableButton = false;
    })
  }
  getPaidAdsNot(){
    this.disableButton = true;
    let paidAdsNot:Array<object> = null;
    this.checkPaidAdsNotType = this.adminpaidad.getPaidAdsNot(this.confirmRequest)
    .subscribe((data:Array<object>)=>{
      paidAdsNot = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      this.numberPaidAdsNot = paidAdsNot.length;
      console.log(paidAdsNot);
      this.disableButton = false;
    })
  }
  getPaidAdsCompany(addPaidAdCompanyForm:NgForm){
    this.disableButton = true;
    let paidAds:Array<object> = null;
    this.checkPaidAdsCompanyType = this.adminpaidad.getPaidAdsCompany(addPaidAdCompanyForm.value.companyName,this.confirmRequest)
    .subscribe((data:Array<object>)=>{
      paidAds = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      this.numberPaidAdsCompany = paidAds.length;
      console.log(paidAds);
      this.disableButton = false;
    })
  }
  getPaidAdsComFalse(){
    this.disableButton = true;
    let paidAdsComFalse:Array<object> = null;
    this.checkPaidAdsNotType = this.adminpaidad.getPaidAdsComFalse(this.confirmRequest)
    .subscribe((data:Array<object>)=>{
      paidAdsComFalse = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      this.numberPaidAdsComFalse = paidAdsComFalse.length;
      console.log(paidAdsComFalse);
      this.disableButton = false;
    })
  }
  setPaidComTrue(setPaidComTrueForm:NgForm){
    this.disableButton = true;
    this.adminpaidad.setPaidComTrue(setPaidComTrueForm.value._id,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messagePaidComTrue = data.message;
      this.disableButton = false;
    });
  }
  deletePaidAd(deletePaidAdForm:NgForm){
    this.disableButton = true;
    this.checkDeletePaidAdsType = this.adminpaidad.deletePaidAd(deletePaidAdForm.value._id,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageDeletePaidAds = data.message;
      this.disableButton = false;
    });
  }
  openButtons(){
    this.disableButton = false;
  }
  ngOnDestroy(): void {
    if(this.checkAddPaidAdType){
      this.checkAddPaidAdType.unsubscribe();
    }
    if(this.checkPaidAdsType){
      this.checkPaidAdsType.unsubscribe();
    }
    if(this.checkPaidAdsNotType){
      this.checkPaidAdsNotType.unsubscribe();
    }
    if(this.checkPaidAdsCompanyType){
      this.checkPaidAdsCompanyType.unsubscribe();
    }
    if(this.checkDeletePaidAdsType){
      this.checkDeletePaidAdsType.unsubscribe();
    }
  }
}
