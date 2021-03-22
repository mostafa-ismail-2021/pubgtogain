import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import {adminblacklist} from './adminblacklist.service';
import { MatDialog } from '@angular/material/dialog';
import {ErrorComponent} from '../../error/error.component';

@Component({
  selector: 'app-adminblacklist',
  templateUrl: './adminblacklist.component.html',
  styleUrls: ['./adminblacklist.component.css']
})
export class AdminblacklistComponent implements OnInit ,OnDestroy {

  constructor(private adminblacklist:adminblacklist , private dialog:MatDialog) { }

  messageBlackList:string = null;
  numberBlackList:number = null;
  messageDeleteBlackList:string = null;
  disableButton:boolean = false;
  confirmRequest:string = "test";
  private checkAddBlackListType:Subscription;
  private checkGetBlacklistType:Subscription;
  private checkDeleteBlackListType:Subscription;
  ngOnInit(): void {
  }
  addBlackListToServer(addBlackListForm:NgForm){
    this.disableButton = true;
    let blackListPerson ={
      email:addBlackListForm.value.email,
      pubgId:addBlackListForm.value.pubgId,
    }
    this.checkAddBlackListType = this.adminblacklist.addBlackListToServer(blackListPerson,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageBlackList = data.message;
      this.disableButton = false;
    });
  }
  getBlackList(){
    this.disableButton = true;
    let blacklist:Array<object> = null;
    this.checkGetBlacklistType = this.adminblacklist.getBlackList(this.confirmRequest)
    .subscribe((data:Array<object>)=>{
      blacklist = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      this.numberBlackList = blacklist.length;
      console.log(blacklist);
      this.disableButton = false;
    })
  }
  deleteBlackList(deleteBlackListForm:NgForm){
    this.disableButton = true;
    this.checkDeleteBlackListType = this.adminblacklist.deleteBlackList(deleteBlackListForm.value._id,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageDeleteBlackList = data.message;
      this.disableButton = false;
    });
  }
  openButtons(){
    this.disableButton = false;
  }
  ngOnDestroy(): void {
    if(this.checkAddBlackListType){
      this.checkAddBlackListType.unsubscribe();
    }
    if(this.checkGetBlacklistType){
      this.checkGetBlacklistType.unsubscribe();
    }
    if(this.checkDeleteBlackListType){
      this.checkDeleteBlackListType.unsubscribe();
    }
  }
}
