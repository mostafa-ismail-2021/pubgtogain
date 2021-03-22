import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {duoAdmin} from './duoAdmin.service';
import {ErrorComponent} from '../../error/error.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-adminduopubg',
  templateUrl: './adminduopubg.component.html',
  styleUrls: ['./adminduopubg.component.css']
})
export class AdminduopubgComponent implements OnInit {

  constructor(private duoAdmin:duoAdmin , private dialog:MatDialog) { }

  disableButton:boolean = false;
  messageAddChampion:string = null;
  messageEndChampion:string = null;
  addCharityAdsRadio:boolean = false;
  messageAddCharityAds:string = null;
  numberCharityAds:number = null;
  messageDeleteCharityAds:string = null;
  deleteCharityAdsRadio:boolean = false;
  getAddPaidAdsRadio:boolean = false;
  messageGetAddPaidAds:string = null;
  messageGetNumberAddPaidAds:string = null;
  getNumberAddPaidAdsRadio:boolean = false;
  messageAddPaidAd:string = null;
  numberPaidAdsNotComplete:number = null;
  numberPaidAds:number = null;
  messageCheckPaidAd:string = null;
  deletePaidAdsRadio:boolean = false;
  messageDeletePaidAds:string = null;
  messageDeletePaidAd:string = null;
  getAllAddBlackListRadio:boolean = false;
  messageGetAllAddBlackList:string = null;
  messageGetRandomAddBlackList:string = null;
  getRandomAddBlackListRadio:boolean = false;
  numberGetAllBlackList:number = null;
  deleteAllBlackListRadio:boolean = false;
  messageDeleteAllBlackList:string = null;
  message:string = null;
  registerTeamLeaderChampionshipType:boolean = null;
  registerMemberChampionshipType:boolean = null;
  registerFreeAdsType:boolean = null;
  registerReportHackerType:boolean = null;
  appearHackerAndWinnersPubg:boolean = null;
  splitPlayersType:boolean = null;
  registerTeamLeaderChampionshipTypeServer:boolean = null;
  registerMemberChampionshipTypeServer:boolean = null;
  registerFreeAdsTypeServer:boolean = null;
  registerReportHackerTypeServer:boolean = null;
  appearHackerAndWinnersPubgServer:boolean = null;
  splitPlayersTypeServer:boolean = null;
  existPaidAdsServer:boolean = null;
  setTeamLeaderTypeTrueRadio:boolean = false;
  setMemberTypeTrueRadio:boolean = false;
  setFreeAdsTypeTrueRadio:boolean = false;
  setReportHackerTypeTrueRadio:boolean = false;
  setAppearHackerAndWinnersTrueRadio:boolean = false;
  setSplitPlayersTypeTrueRadio:boolean = false;
  setTeamLeaderTypeFalseRadio:boolean = false;
  setMemberTypeFalseRadio:boolean = false;
  setFreeAdsTypeFalseRadio:boolean = false;
  setReportHackerTypeFalseRadio:boolean = false;
  setAppearHackerAndWinnersFalseRadio:boolean = false;
  setSplitPlayersTypeFalseRadio:boolean = false;
  messageTeamLeaderTypeTrue:string = null;
  messageMemberTypeTrue:string = null;
  messageFreeAdsTypeTrue:string = null;
  messageReportHackerTypeTrue:string = null;
  messageAppearHackerAndWinnersTrue:string = null;
  messageSplitPlayersTypeTrue:string = null;
  messageTeamLeaderTypeFalse:string = null;
  messageMemberTypeFalse:string = null;
  messageFreeAdsTypeFalse:string = null;
  messageReportHackerTypeFalse:string = null;
  messageAppearHackerAndWinnersFalse:string = null;
  messageSplitPlayersTypeFalse:string = null;
  numberRegisterFreeAds:number = null;
  messageAddFreeAds:string = null;
  addAdsWillAppearRadio:boolean = false;
  messageAddFreeAd:string = null;
  numberFreeAdsWillAppear:number = null;
  deleteAdsWillAppearRadio:boolean = false;
  messageDeleteFreeAds:string = null;
  messageDeleteFreeAd:string = null;
  messageAddPlayer:string = null;
  messageDeletePlayer:string = null;
  numberDaysTheFirstRoundTake:number = null;
  autoAddSplitPlayer:string = null;
  numbergetCountWinners:number = null;
  deleteSplitPlayerIdPubgRadio:boolean = false;
  deleteSplitPlayerGroupRadio:boolean = false;
  manulSplitPlayersRadio:boolean = false;
  manualAddSplitPlayer:string = null;
  numberSplitPlayer:number = null;
  numberSplitPlayerDate:number = null;
  getSplitPlayersDateRadio:boolean = false;
  numberRegisterHackers:number = null;
  popHackerRadio:boolean = false;
  addHackersRadio:boolean = false;
  messageHackers:string = null;
  messageHacker:string = null;
  sendOneHackerDataRadio:boolean = false;
  numberHackers:number = null;
  messageDeleteReportHacker:string = null;
  messageWinners:string = null;
  popWinnerPubgRadio:boolean = false;
  addWinnersRadio:boolean = false;
  messageWinner:string = null;
  sendOneWinnerDataRadio:boolean = false;
  numberwinners:number = null;
  messageDeleteWinner:string = null;
  addDeleteHackersAndWinnersRadio:boolean = false;
  messageAddDeleteHackersWinners:string = null;
  messageGetAddHackersWinners:string = null;
  getAddHackersAndWinnersRadio:boolean = false;
  numberCharityAdsServer:number = null;
  messageExistPaidAdsTrue:string = null;
  setExistPaidAdsTrueRadio:boolean = false;
  messageExistPaidAdsFalse:string = null;
  setExistPaidAdsFalseRadio:boolean = false;
  numberFreeAdsWillAppearServer:number = null;
  messageAddAdsToServer:string = null;
  adsFromDatabaseToServerRadio:boolean = false;
  deleteAllRegisterFreeRadio:boolean = false;
  messagedeleteAllRegisterFree:string = null;
  autoAddSplitPlayerWinners:string = null;
  messagedeleteRegisterPlayers:string = null;
  deleteRegisterPlayersRadio:boolean = false;
  getAddSplitPlayerRadio:boolean= false;
  messageGetAddSplitPlayers:string = null;
  existPaidAds:boolean = null;
  showAdsWillAppear:boolean = null;
  showAdsWillAppearServer:boolean = null;
  setShowAdsWillAppearTrueRadio:boolean = false;
  messageShowAdsWillAppearTrue:string = null;
  setShowAdsWillAppearFalseRadio:boolean = false;
  messageShowAdsWillAppearFalse:string = null;
  messageGetAddPagesStates:string = null;
  messageDeleteHackersAndWinners:string = null;
  deleteHackersAndWinnersRadio:boolean = false;
  messageGetAddBlackList:string = null;
  getAddBlackListRadio:boolean = false;
  messageDeleteSplitePlayer:string = null;
  deleteSplitePlayerRadio:boolean = false;
  messageGetAddTotalPlayers:string = null;
  getAddTotalPlayersRadio:boolean = false;
  deleteEmailsRadio:boolean = false;
  messageDeleteEmails:string = null;
  hackersDataArray:Array<object> = [];
  winnersData:Array<object> = [];
  PubgIdsGroup:Array<object> = [];
  GroupsData:Array<object> = [];
  confirmRequest:string = "test";
  phonesAcceptPlayers:boolean = null;
  phonesAcceptPlayersServer:boolean = null;
  setPhonesAcceptPlayersTrueRadio:boolean = false;
  messagePhonesAcceptPlayersTrue:string = null;
  setPhonesAcceptPlayersFalseRadio:boolean = false;
  messagePhonesAcceptPlayersFalse:string = null;
  phonesNumbersData:Array<{phone:string}> = [];
  popPhonesNumbersRadio:boolean = false;
  addPhonesNumbersRadio:boolean = false;
  messagePhonesNumbers:string = null;
  messageAddPhoneNumber:string = null;
  numberGetAllPhonesNumbers:number = null;
  messageGetPhoneNumberPhones:string = null;
  messageGetPhoneNumberRegister:string = null;
  getPhoneNumberRegisterRadio:boolean = false;
  getPhoneNumberPhonesRadio:boolean = false;
  numberGetPlayersNotPhones:number = null;
  messageDeletePhoneNumber:string = null;
  messageDeleteAllPhonesNumbers:string = null;
  deleteAllPhonesNumbersRadio:boolean = false;
  groupsRamadan:Array<{round:number,groupNumber:number,groupPlayers:Array<{pubgIdTeamLeader:string,pubgIdMember:string}>, date:string , time:number}> = [];
  messageAddRamadanGroup:string = null;
  messageDeleteRamadanGroup:string = null;
  numberTimeGroupsRamadan:number = null;
  messagedeletePlayerRamadan:string = "";
  messageSearchPlayerRamadan:string = "";
  messageTest:string = null;

  ngOnInit(): void {

  }

  addChampion(addChampionForm:NgForm){
    this.disableButton = true;
    if(addChampionForm.valid){
      this.duoAdmin.addChampion(addChampionForm.value.startDate,addChampionForm.value.totalPlayers,addChampionForm.value.playerCountry,this.confirmRequest)
      .subscribe((data:{message:string})=>{
        this.messageAddChampion = data.message;
        this.disableButton = false;
      });
    }
  }
  endChampion(){
    this.disableButton = true;
    this.duoAdmin.deleteChampionShips(this.confirmRequest).subscribe((data1:{finish:boolean})=>{
      if(data1.finish == true){
        this.messageEndChampion = "championships delete successfully";
        this.duoAdmin.deleteHackersAndWinners(this.confirmRequest).subscribe((data2:{finish:boolean})=>{
          if(data2.finish == true){
            this.messageEndChampion += " -> hackers and winners delete successfully";
            this.duoAdmin.deleteRegisterFreeAds(this.confirmRequest).subscribe((data3:{finish:boolean})=>{
              if(data3.finish == true){
                this.messageEndChampion += " -> register free ads delete successfully";
                this.duoAdmin.deleteRegisterHackers(this.confirmRequest).subscribe((data4:{finish:boolean})=>{
                  if(data4.finish == true){
                    this.messageEndChampion += " -> register hackers delete successfully";
                    this.duoAdmin.deleteRegisterPlayers(this.confirmRequest).subscribe((data5:{finish:boolean})=>{
                      if(data5.finish == true){
                        this.messageEndChampion += " -> register players delete successfully";
                        this.duoAdmin.deleteSplitePlayers(this.confirmRequest).subscribe((data6:{finish:boolean})=>{
                          if(data6.finish == true){
                            this.messageEndChampion += " -> splite players delete successfully";
                            this.duoAdmin.deleteTempHackersAndWinners(this.confirmRequest).subscribe((data7:{finish:boolean})=>{
                              if(data7.finish == true){
                                this.messageEndChampion += " -> temp hackers and winners delete successfully";
                                this.duoAdmin.deleteTempSplitePlayers(this.confirmRequest).subscribe((data8:{finish:boolean})=>{
                                  if(data8.finish == true){
                                    this.messageEndChampion += " -> temp splite players delete successfully";
                                    this.duoAdmin.setAllServerRefFalse(this.confirmRequest).subscribe((data:{finish:boolean})=>{
                                      if(data.finish == true){
                                        this.messageEndChampion += " -> all variable in server be false ---> done";
                                        this.disableButton = false;
                                      }
                                      else{
                                        this.messageEndChampion = "-> error in set variable in server false";
                                      }
                                    });
                                  }
                                  else{
                                    this.messageEndChampion = "-> error in delete temp splite players";
                                  }
                                });
                              }
                              else{
                                this.messageEndChampion = "-> error in delete temp hackers and winners";
                              }
                            });
                          }
                          else{
                            this.messageEndChampion = "-> error in delete splite players";
                          }
                        });
                      }
                      else{
                        this.messageEndChampion = "-> error in delete register players";
                      }
                    });
                  }
                  else{
                    this.messageEndChampion = "-> error in delete register hackers";
                  }
                });
              }
              else{
                this.messageEndChampion = "-> error in delete register free ads";
              }
            });
          }
          else{
            this.messageEndChampion = "-> error in delete hackers and winners";
          }
        });
      }
      else{
        this.messageEndChampion = "error in delete championships";
      }
    });
  }
  deleteEmails(){
    this.disableButton = true;
    this.duoAdmin.deleteEmails(this.confirmRequest).subscribe((data:{finish:boolean})=>{
      if(data.finish == true){
        this.messageDeleteEmails = "emails in table deleted successfully";
        this.disableButton = false;
      }
      else{
        this.messageDeleteEmails = "error in delete emails in table";
      }
    });
  }
  addCharityAds(){
    this.disableButton = true;
    let adsData:Array<object> = null;
    this.duoAdmin.getCharityAdsTable(this.confirmRequest)
    .subscribe((data:Array<object>)=>{
      adsData = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      this.duoAdmin.addCharityAds(adsData,this.confirmRequest).subscribe((data:{message:string})=>{
        this.messageAddCharityAds = data.message;
        this.disableButton = false;
      });
    })
  }
  getCharityAds(){
    this.disableButton = true;
    let adsData:Array<object> = null;
    this.duoAdmin.getCharityAds(this.confirmRequest)
    .subscribe((data:Array<object>)=>{
      adsData = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      this.numberCharityAds = adsData.length;
      console.log(adsData);
      this.disableButton = false;
    })
  }
  
  getCharityAdsServer(){
    this.disableButton = true;
    let adsData:{ads:object} = null;
    let countAdsData:number = 0;
    this.duoAdmin.getCharityAdsServer(this.confirmRequest)
    .subscribe((data:{ads:object})=>{
      adsData = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      Object.keys(adsData).forEach(key => {
        let value = adsData[key];
        for (let index = 0; index < value.length; index++) {
          countAdsData++;
        }
      });
      this.numberCharityAdsServer = countAdsData;
      console.log(adsData);
      this.disableButton = false;
    })
  }
  deleteCharityAds(){
    this.disableButton = true;
    this.duoAdmin.deleteCharityAds(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageDeleteCharityAds = data.message;
      this.disableButton = false;
    });
  }
  getAddPaidAds(){
    this.disableButton = true;
    let getAds:Array<{_id:string}> = null;
    let addAds:Array<string> = [];
    this.duoAdmin.getPaidAds(this.confirmRequest)
    .subscribe((data:Array<{_id:string}>)=>{
      getAds = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      if(getAds.length != 0){
        for (let index = 0; index < getAds.length; index++) {
          const element = getAds[index];
          addAds.push(element._id);
        }
        this.duoAdmin.addPaidAds(addAds,this.confirmRequest)
        .subscribe((data:{message:string})=>{
          this.messageGetAddPaidAds = data.message;
          this.disableButton = false;
        })
      }
      else{
        alert("no data in paid ads");
      }
    }
    );
  }
  getNumberAddPaidAds(getNumberAddPaidAdsForm:NgForm){
    this.disableButton = true;
    let getAds:Array<{_id:string}> = null;
    let addAds:Array<string> = [];
    this.duoAdmin.getNumberPaidAds(getNumberAddPaidAdsForm.value.number,this.confirmRequest)
    .subscribe((data:Array<{_id:string}>)=>{
      getAds = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      if(getAds.length != 0){
        for (let index = 0; index < getAds.length; index++) {
          const element = getAds[index];
          addAds.push(element._id);
        }
        this.duoAdmin.addPaidAds(addAds,this.confirmRequest)
        .subscribe((data:{message:string})=>{
          this.messageGetNumberAddPaidAds = data.message;
          this.disableButton = false;
        })
      }
      else{
        alert("no data in paid ads");
      }
    }
    );
  }
  addPaidAd(addPaidAdForm:NgForm){
    this.disableButton = true;
    let paidAd:string = addPaidAdForm.value.id ;
    this.duoAdmin.addPaidAd(paidAd,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageAddPaidAd = data.message;
      this.disableButton = false;
    });
  }
  getPaidAds(){
    this.disableButton = true;
    let paidAds:Array<{_id:string}> = null;
    this.duoAdmin.getPaidAds(this.confirmRequest)
    .subscribe((data:Array<{_id:string}>)=>{
      paidAds = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      this.numberPaidAdsNotComplete = paidAds.length;
      console.log(paidAds);
      this.disableButton = false;
    })
  }
  getDuoPaidAds(){
    this.disableButton = true;
    let duoPaidAds:Array<{_id:string}> = null;
    this.duoAdmin.getDuoPaidAds(this.confirmRequest)
    .subscribe((data:Array<{_id:string}>)=>{
      duoPaidAds = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      this.numberPaidAds = duoPaidAds.length;
      console.log(duoPaidAds);
      this.disableButton = false;
    })
  }
  deletePaidAds(){
    this.disableButton = true;
    this.duoAdmin.deletePaidAds(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageDeletePaidAds = data.message;
      this.disableButton = false;
    });
  }
  deletePaidAd(deletePaidAdForm:NgForm){
    this.disableButton = true;
    this.duoAdmin.deletePaidAd(deletePaidAdForm.value.id,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageDeletePaidAd = data.message;
      this.disableButton = false;
    });
  }
  getAllAddBlackList(){
    this.disableButton = true;
    this.duoAdmin.getAllAddBlackList(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageGetAllAddBlackList = data.message;
      this.disableButton = false;
    });
  }
  getRandomAddBlackList(getRandomAddBlackListForm:NgForm){
    this.disableButton = true;
    this.duoAdmin.getRandomAddBlackList(getRandomAddBlackListForm.value.numberPlayers,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageGetRandomAddBlackList = data.message;
      this.disableButton = false;
    });
  }
  getAllBlackList(){
    this.disableButton = true;
    let AllBlackList:Array<object> = null;
    this.duoAdmin.getAllBlackList(this.confirmRequest)
    .subscribe((data:Array<object>)=>{
      AllBlackList = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      this.numberGetAllBlackList = AllBlackList.length;
      console.log(AllBlackList);
      this.disableButton = false;
    })
  }
  deleteAllBlackList(){
    this.disableButton = true;
    this.duoAdmin.deleteAllBlackList(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageDeleteAllBlackList = data.message;
      this.disableButton = false;
    });
  }
  getPagesStates(){
    this.disableButton = true;
    this.duoAdmin.getDuoPagesStates(this.confirmRequest).subscribe((data:{exist:boolean,error:boolean,
      registerTeamLeaderChampionshipType:boolean,
      registerMemberChampionshipType:boolean,
      registerFreeAdsType:boolean,
      registerReportHackerType:boolean,
      appearHackerAndWinnersPubg:boolean,
      splitPlayersType:boolean,
      existPaidAds:boolean,
      showAdsWillAppear:boolean,
      phonesAcceptPlayers:boolean}) =>{
        if(data.exist == false)
        {
          this.message = "no champion ship open";
        }
        else if(data.error == true)
        {
          this.message = "error occur in server";
        }
        else{
          this.message = "data get success";
        }
        this.registerTeamLeaderChampionshipType = data.registerTeamLeaderChampionshipType;
        this.registerMemberChampionshipType = data.registerMemberChampionshipType;
        this.registerFreeAdsType = data.registerFreeAdsType;
        this.registerReportHackerType = data.registerReportHackerType;
        this.appearHackerAndWinnersPubg = data.appearHackerAndWinnersPubg;
        this.splitPlayersType = data.splitPlayersType;
        this.existPaidAds = data.existPaidAds;
        this.showAdsWillAppear = data.showAdsWillAppear;
        this.phonesAcceptPlayers = data.phonesAcceptPlayers;
        this.disableButton = false;
    });
  }
  getPagesStatesServer(){
    this.disableButton = true;
    this.duoAdmin.getDuoPagesStatesServer(this.confirmRequest).subscribe((data:{
      registerTeamLeaderChampionshipType:boolean,
      registerMemberChampionshipType:boolean,
      registerFreeAdsType:boolean,
      registerReportHackerType:boolean,
      appearHackerAndWinnersPubg:boolean,
      splitPlayersType:boolean,
      existPaidAds:boolean,
      showAdsWillAppear:boolean,
      phonesAcceptPlayers:boolean}) =>{
        this.registerTeamLeaderChampionshipTypeServer = data.registerTeamLeaderChampionshipType;
        this.registerMemberChampionshipTypeServer = data.registerMemberChampionshipType;
        this.registerFreeAdsTypeServer = data.registerFreeAdsType;
        this.registerReportHackerTypeServer = data.registerReportHackerType;
        this.appearHackerAndWinnersPubgServer = data.appearHackerAndWinnersPubg;
        this.splitPlayersTypeServer = data.splitPlayersType;
        this.existPaidAdsServer = data.existPaidAds;
        this.showAdsWillAppearServer = data.showAdsWillAppear;
        this.phonesAcceptPlayersServer = data.phonesAcceptPlayers;
        this.disableButton = false;
    });
  }
  
  setTeamLeaderTypeTrue(){
    this.disableButton = true;
    this.duoAdmin.setTeamLeaderTypeTrue(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageTeamLeaderTypeTrue = data.message;
      this.disableButton = false;
    });
  }
  setMemberTypeTrue(){
    this.disableButton = true;
    this.duoAdmin.setMemberTypeTrue(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageMemberTypeTrue = data.message;
      this.disableButton = false;
    });
  }
  setFreeAdsTypeTrue(){
    this.disableButton = true;
    this.duoAdmin.setFreeAdsTypeTrue(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageFreeAdsTypeTrue = data.message;
      this.disableButton = false;
    });
  }
  setReportHackerTypeTrue(){
    this.disableButton = true;
    this.duoAdmin.setReportHackerTypeTrue(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageReportHackerTypeTrue = data.message;
      this.disableButton = false;
    });
  }
  setAppearHackerAndWinnersTrue(){
    this.disableButton = true;
    this.duoAdmin.setAppearHackerAndWinnersTrue(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageAppearHackerAndWinnersTrue = data.message;
      this.disableButton = false;
    });
  }
  setSplitPlayersTypeTrue(){
    this.disableButton = true;
    this.duoAdmin.setSplitPlayersTypeTrue(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageSplitPlayersTypeTrue = data.message;
      this.disableButton = false;
    });
  }
  setExistPaidAdsTrue(){
    this.disableButton = true;
    this.duoAdmin.setExistPaidAdsTrue(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageExistPaidAdsTrue = data.message;
      this.disableButton = false;
    });
  }
  setShowAdsWillAppearTrue(){
    this.disableButton = true;
    this.duoAdmin.setShowAdsWillAppearTrue(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageShowAdsWillAppearTrue = data.message;
      this.disableButton = false;
    });
  }
  setPhonesAcceptPlayersTrue(){
    this.disableButton = true;
    this.duoAdmin.setPhonesAcceptPlayersTrue(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messagePhonesAcceptPlayersTrue = data.message;
      this.disableButton = false;
    });
  }
  setTeamLeaderTypeFalse(){
    this.disableButton = true;
    this.duoAdmin.setTeamLeaderTypeFalse(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageTeamLeaderTypeFalse = data.message;
      this.disableButton = false;
    });
  }
  setMemberTypeFalse(){
    this.disableButton = true;
    this.duoAdmin.setMemberTypeFalse(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageMemberTypeFalse = data.message;
      this.disableButton = false;
    });
  }
  setFreeAdsTypeFalse(){
    this.disableButton = true;
    this.duoAdmin.setFreeAdsTypeFalse(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageFreeAdsTypeFalse = data.message;
      this.disableButton = false;
    });
  }
  setReportHackerTypeFalse(){
    this.disableButton = true;
    this.duoAdmin.setReportHackerTypeFalse(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageReportHackerTypeFalse = data.message;
      this.disableButton = false;
    });
  }
  setAppearHackerAndWinnersFalse(){
    this.disableButton = true;
    this.duoAdmin.setAppearHackerAndWinnersFalse(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageAppearHackerAndWinnersFalse = data.message;
      this.disableButton = false;
    });
  }
  setSplitPlayersTypeFalse(){
    this.disableButton = true;
    this.duoAdmin.setSplitPlayersTypeFalse(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageSplitPlayersTypeFalse = data.message;
      this.disableButton = false;
    });
  }
  setExistPaidAdsFalse(){
    this.disableButton = true;
    this.duoAdmin.setExistPaidAdsFalse(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageExistPaidAdsFalse = data.message;
      this.disableButton = false;
    });
  }
  setShowAdsWillAppearFalse(){
    this.disableButton = true;
    this.duoAdmin.setShowAdsWillAppearFalse(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageShowAdsWillAppearFalse = data.message;
      this.disableButton = false;
    });
  }
  setPhonesAcceptPlayersFalse(){
    this.disableButton = true;
    this.duoAdmin.setPhonesAcceptPlayersFalse(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messagePhonesAcceptPlayersFalse = data.message;
      this.disableButton = false;
    });
  }
  getAddPagesStates(){
    this.disableButton = true;
    this.duoAdmin.getAddPagesStates(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageGetAddPagesStates = data.message;
      this.disableButton = false;
    });
  }
  getRegisterAds(){
    this.disableButton = true;
    let adsData:Array<{videoId:string, email:string, adAppearanceCountry:string}> = null;
    this.duoAdmin.getRegisterAds(this.confirmRequest)
    .subscribe((data:Array<{videoId:string, email:string, adAppearanceCountry:string}>)=>{
      adsData = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      for (let index = 0; index < adsData.length; index++) {
        adsData[index].videoId = "https://youtu.be/"+adsData[index].videoId;
      }
      this.numberRegisterFreeAds = adsData.length;
      console.log(adsData);
      this.disableButton = false;
    })
  }
  addAdsWillAppear(freeAds:NgForm){
    this.disableButton = true;
    let addAdsWillAppear:Array<object> = null;
    this.duoAdmin.getAdsWillAppear(freeAds.value.numberAds,this.confirmRequest)
    .subscribe((data:Array<object>)=>{
      addAdsWillAppear = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      if(addAdsWillAppear.length != 0){
        this.duoAdmin.addAdsWillAppear(addAdsWillAppear,this.confirmRequest)
        .subscribe((data:{message:string})=>{
          this.messageAddFreeAds = data.message;
        })
      }
      else{
        alert("no data in register free ads to added in ads will appear");
        this.messageAddFreeAds = "no free ads will appear added";
      }
      this.disableButton = false;
    }
    );
  }
  addFreeAd(addFreeAdForm:NgForm){
    this.disableButton = true;
    let videoId = addFreeAdForm.value.videoId.split("/").pop();
    this.duoAdmin.addFreeAd(videoId ,addFreeAdForm.value.email , addFreeAdForm.value.adCountry ,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageAddFreeAd = data.message;
      this.disableButton = false;
    });
  }
  getRealAdsWillAppear(){
    this.disableButton = true;
    let adsData:Array<object> = null;
    this.duoAdmin.getRealAdsWillAppear(this.confirmRequest)
    .subscribe((data:Array<object>)=>{
      adsData = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      this.numberFreeAdsWillAppear = adsData.length;
      console.log(adsData);
      this.disableButton = false;
    })
  }
  getRealAdsWillAppearServer(){
    this.disableButton = true;
    let adsData:{ads:object} = null;
    let countAdsData:number = 0;
    this.duoAdmin.getRealAdsWillAppearServer(this.confirmRequest)
    .subscribe((data:{ads:object})=>{
      adsData = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      Object.keys(adsData).forEach(key => {
        let value = adsData[key];
        for (let index = 0; index < value.length; index++) {
          countAdsData++;
        }
      });
      this.numberFreeAdsWillAppearServer = countAdsData;
      console.log(adsData);
      this.disableButton = false;
    })
  }
  deleteAdsWillAppear(){
    this.disableButton = true;
    this.duoAdmin.deleteAdsWillAppear(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageDeleteFreeAds = data.message;
      this.disableButton = false;
    });
  }
  deleteFreeAd(deleteFreeAdForm:NgForm){
    this.disableButton = true;
    this.duoAdmin.deleteFreeAd(deleteFreeAdForm.value.id,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageDeleteFreeAd = data.message;
      this.disableButton = false;
    });
  }
  adsFromDatabaseToServer(){
    this.disableButton = true;
    this.duoAdmin.adsFromDatabaseToServer(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageAddAdsToServer = data.message;
      this.disableButton = false;
    });
  }
  deleteAllRegisterFree(){
    this.disableButton = true;
    this.duoAdmin.deleteRegisterFreeAds(this.confirmRequest).subscribe((data:{finish:boolean})=>{
      if(data.finish == true){
        this.messagedeleteAllRegisterFree = "data deleted successfuly";
      }
      else{
        this.messagedeleteAllRegisterFree = "error occur";
      }
      this.disableButton = false;
    });
  }
  addPlayer(addPlayerForm:NgForm){
    this.disableButton = true;
    let data:Array<object> = [
      {
        emailTeamLeader:addPlayerForm.value.teamleaderEmail,
        pubgIdTeamLeader:addPlayerForm.value.teamleaderPubgId ,
        displayedAdTeamLeader:"adminData",
        emailMember:addPlayerForm.value.memberEmail,
        pubgIdMember:addPlayerForm.value.memberPubgId ,
        displayedAdMember:"adminData",
        acceptPlayer:true
      }
    ]
    this.duoAdmin.addPlayer(data,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageAddPlayer = data.message;
      this.disableButton = false;
    });
  }
  deletePlayer(deletePlayerForm:NgForm){
    this.disableButton = true;
    this.duoAdmin.deletePlayer(deletePlayerForm.value.pubgId,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageDeletePlayer = data.message;
      this.disableButton = false;
    });
  }
  getPlayersAndCountDays(getPlayersAndCountDaysForm:NgForm){
    this.disableButton = true;
    let getPubgIdsArray:Array<object> = [];
    this.duoAdmin.getIdsPubg(this.confirmRequest).subscribe(data=>{
      getPubgIdsArray = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      if(getPubgIdsArray.length != 0){
        let timeAllGroupsInDay:number = parseInt(getPlayersAndCountDaysForm.value.endTime) - parseInt(getPlayersAndCountDaysForm.value.startTime) + 1;
        let numberPlayersInDay:number = timeAllGroupsInDay * parseInt(getPlayersAndCountDaysForm.value.playersNumberInGroup);
        let numberDaysSameTimeOneGroup:number = Math.ceil(getPubgIdsArray.length/numberPlayersInDay);
        this.numberDaysTheFirstRoundTake = Math.ceil(numberDaysSameTimeOneGroup/parseInt(getPlayersAndCountDaysForm.value.maxSameTimeGroup)) * (parseInt(getPlayersAndCountDaysForm.value.freeDays) + 1);
        console.log(getPubgIdsArray);
      }
      else{
        alert("no players in database");
      }
      this.disableButton = false;
    })
  }
  autoSplitPlayers(splitPlayersAuto:NgForm){
    this.disableButton = true;
    let pubgIdsArray:Array<object> = [];
    this.duoAdmin.getIdsPubg(this.confirmRequest).subscribe(data=>{
      pubgIdsArray = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      if(pubgIdsArray.length != 0){
        this.autoAddSplitPlayer = "register players get successfully";
        pubgIdsArray = this.shuffle(pubgIdsArray);
        let i,j,temparray,chunk = parseInt(splitPlayersAuto.value.maxGroup);
        let data:Array<object> = [];
        let counterGroupNumber:number = 1;
        let counterMonthIndex:number = 0;
        let startDay:number= parseInt(splitPlayersAuto.value.dayNumber);
        let startMonth:number = parseInt(splitPlayersAuto.value.monthNumber);
        let startyear:number = parseInt(splitPlayersAuto.value.yearNumber);
        let sliceMonths:Array<number>=splitPlayersAuto.value.sliceMonths.split(",");
        let startTime:number = parseInt(splitPlayersAuto.value.startTime);
        let timeOfNextGroup:number = parseInt(splitPlayersAuto.value.startTime);
        let endTime:number = parseInt(splitPlayersAuto.value.endTime);
        let maxSameTimeGroup = parseInt(splitPlayersAuto.value.maxSameTimeGroup);
        let freeDays = parseInt(splitPlayersAuto.value.freeDays);
        let startDayFromFirst:boolean = true;
        let countMaxSameTimeGroup = 1
        for (i=0,j=pubgIdsArray.length; i<j; i+=chunk) {
          temparray = pubgIdsArray.slice(i,i+chunk);
          if(timeOfNextGroup > endTime)
          {
            timeOfNextGroup = startTime;
            startDay += freeDays+1;
            if(startDay == sliceMonths[counterMonthIndex]){
              startDayFromFirst = false;
            }
            if(startDay > sliceMonths[counterMonthIndex]){
              if(startDayFromFirst == true){
                startDay = 1;
              }
              else{
                startDay = freeDays+1;
              }
              startMonth++;
              counterMonthIndex++;
              if(startMonth > 12){
                startyear++;
                startMonth = 1;
                if(startDayFromFirst == true){
                  startDay = 1;
                }
                else{
                  startDay = freeDays+1;
                }
              }
              startDayFromFirst = true;
            }
          }
          let date = startDay+"/"+startMonth+"/"+startyear;
          data.push({
            round:1,
            groupNumber:counterGroupNumber,
            groupPlayers:temparray,
            date:date,
            time:timeOfNextGroup
          });
          counterGroupNumber++;
          if(countMaxSameTimeGroup == maxSameTimeGroup){
            timeOfNextGroup++;
            countMaxSameTimeGroup = 1;
          }
          else{
            countMaxSameTimeGroup++;
          }
        }
        this.addSubSplitPlayers(data , 0 , "register");
      }
      else{
        alert("no players in database");
      }
    });
  }
  getCountWinners(getCountWinnersForm:NgForm){
    this.disableButton = true;
    let getPubgIdsArray:Array<object> = [];
    this.duoAdmin.getLastWinnersRound(this.confirmRequest).subscribe(data=>{
      getPubgIdsArray = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      if(getPubgIdsArray.length != 0){
        let timeAllGroupsInDay:number = parseInt(getCountWinnersForm.value.endTime) - parseInt(getCountWinnersForm.value.startTime) + 1;
        let numberPlayersInDay:number = timeAllGroupsInDay * parseInt(getCountWinnersForm.value.playersNumberInGroup);
        let numberDaysSameTimeOneGroup:number = Math.ceil(getPubgIdsArray.length/numberPlayersInDay);
        this.numbergetCountWinners = Math.ceil(numberDaysSameTimeOneGroup/parseInt(getCountWinnersForm.value.maxSameTimeGroup)) * (parseInt(getCountWinnersForm.value.freeDays) + 1);
        console.log(getPubgIdsArray);
      }
      else{
        alert("no players in database");
      }
      this.disableButton = false;
    })
  }
  autoSplitPlayersWinners(splitPlayersAutoWinners:NgForm){
    this.disableButton = true;
    let splitPlayers:Array<object> = null
    this.duoAdmin.getSplitPlayer(this.confirmRequest).subscribe(data=>{
      splitPlayers = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      if(splitPlayers.length != 0){
        this.autoAddSplitPlayerWinners = "get splite players data successfully";
        this.addSubTempSplitPlayers(splitPlayers , 0 , "winners" , splitPlayersAutoWinners);
      }
      else{
        alert("no players in database");
      }
    })
  }
  continueAutoSplitPlayersWinners(splitPlayersAutoWinners:NgForm){
    this.duoAdmin.deleteSplitePlayers(this.confirmRequest).subscribe((data1:{finish:boolean})=>{
      if(data1.finish == true){
        this.autoAddSplitPlayerWinners += "delete splite players data successfully";
        let pubgIdsArray:Array<object> = [];
        this.duoAdmin.getLastWinnersRound(this.confirmRequest).subscribe(data=>{
          pubgIdsArray = data;
        },error=>this.dialog.open(ErrorComponent)
        ,()=>{
          if(pubgIdsArray.length != 0){
            this.autoAddSplitPlayerWinners += "get last winners round successfully";
            pubgIdsArray = this.shuffle(pubgIdsArray);
            let i,j,temparray,chunk = parseInt(splitPlayersAutoWinners.value.maxGroup);
            let data:Array<object> = [];
            let counterGroupNumber:number = 1;
            let counterMonthIndex:number = 0;
            let startDay:number= parseInt(splitPlayersAutoWinners.value.dayNumber);
            let startMonth:number = parseInt(splitPlayersAutoWinners.value.monthNumber);
            let startyear:number = parseInt(splitPlayersAutoWinners.value.yearNumber);
            let sliceMonths:Array<number>=splitPlayersAutoWinners.value.sliceMonths.split(",");
            let startTime:number = parseInt(splitPlayersAutoWinners.value.startTime);
            let timeOfNextGroup:number = parseInt(splitPlayersAutoWinners.value.startTime);
            let endTime:number = parseInt(splitPlayersAutoWinners.value.endTime);
            let maxSameTimeGroup = parseInt(splitPlayersAutoWinners.value.maxSameTimeGroup);
            let round = parseInt(splitPlayersAutoWinners.value.round);
            let freeDays = parseInt(splitPlayersAutoWinners.value.freeDays);
            let startDayFromFirst:boolean = true;
            let countMaxSameTimeGroup = 1
            for (i=0,j=pubgIdsArray.length; i<j; i+=chunk) {
              temparray = pubgIdsArray.slice(i,i+chunk);
              if(timeOfNextGroup > endTime)
              {
                timeOfNextGroup = startTime;
                startDay += freeDays+1;
                if(startDay == sliceMonths[counterMonthIndex]){
                  startDayFromFirst = false;
                }
                if(startDay > sliceMonths[counterMonthIndex]){
                  if(startDayFromFirst == true){
                    startDay = 1;
                  }
                  else{
                    startDay = freeDays+1;
                  }
                  startMonth++;
                  counterMonthIndex++;
                  if(startMonth > 12){
                    startyear++;
                    startMonth = 1;
                    if(startDayFromFirst == true){
                      startDay = 1;
                    }
                    else{
                      startDay = freeDays+1;
                    }
                  }
                  startDayFromFirst = true;
                }
              }
              let date = startDay+"/"+startMonth+"/"+startyear;
              data.push({
                round:round,
                groupNumber:counterGroupNumber,
                groupPlayers:temparray,
                date:date,
                time:timeOfNextGroup
              });
              counterGroupNumber++;
              if(countMaxSameTimeGroup == maxSameTimeGroup){
                timeOfNextGroup++;
                countMaxSameTimeGroup = 1;
              }
              else{
                countMaxSameTimeGroup++;
              }
            }
            this.addSubSplitPlayers(data , 0 , "winners");
          }
          else{
            alert("no players in database");
          }
        });
      }
      else{
        this.autoAddSplitPlayerWinners = "error in delete split player";
      }
    });
  }
  addSplitPlayerIdPubg(idPubgForm:NgForm){
    this.disableButton = true;
    this.PubgIdsGroup.push({pubgIdTeamLeader:idPubgForm.value.pubgIdTeamLeader , pubgIdMember:idPubgForm.value.pubgIdMember});
    this.disableButton = false;
  }
  deleteSplitPlayerIdPubg(){
    this.disableButton = true;
    this.PubgIdsGroup.pop();
    this.disableButton = false;
  }
  addSplitPlayerGroup(groupForm:NgForm){
    this.disableButton = true;
    if(this.PubgIdsGroup.length == 0)
    {
      alert("add ids pubg to group first");
    }
    else{
      this.GroupsData.push({
        round:groupForm.value.round,
        groupNumber:groupForm.value.groupNumber,
        groupPlayers:this.PubgIdsGroup,
        date:groupForm.value.date,
        time:parseInt(groupForm.value.time)
      });
      this.PubgIdsGroup = [];
    }
    this.disableButton = false;
  }
  deleteSplitPlayerGroup(){
    this.disableButton = true;
    this.GroupsData.pop();
    this.disableButton = false;
  }

  manulSplitPlayers(){
    this.disableButton = true;
    let splitPlayers:Array<object> = null
    this.duoAdmin.getSplitPlayer(this.confirmRequest).subscribe(data=>{
      splitPlayers = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      if(splitPlayers.length != 0){
        this.manualAddSplitPlayer = "get splite players successfuly";
        this.addSubTempSplitPlayers(splitPlayers , 0 , "manul" , null);
      }
      else{
        this.manualAddSplitPlayer = "error in get split players";
      }
    })
  }
  continueManulSplitPlayers(){
    this.duoAdmin.deleteSplitePlayers(this.confirmRequest).subscribe((data1:{finish:boolean})=>{
      if(data1.finish == true){
        this.manualAddSplitPlayer += " -> delete splite players successfuly";
        this.addSubSplitPlayers(this.GroupsData , 0 , "manual");
      }
      else{
        this.manualAddSplitPlayer = "error in delete splite players";
      }
    })
  }
  addSubSplitPlayers(data:Array<object> , number:number , detectVariable:string){
    if(data.length != 0){
      let _this = this;
      number++;
      setTimeout(function () {
        let subData = data.splice(0,50);
        _this.duoAdmin.addSplitPlayers(subData,_this.confirmRequest).subscribe((data1:{finish:boolean})=>{
          if(data1.finish == true){
            if(detectVariable == "register")
            {
              _this.autoAddSplitPlayer = _this.autoAddSplitPlayer + " -> data added successfully " + number;
              _this.addSubSplitPlayers(data,number,detectVariable);
            }
            else if(detectVariable == "winners"){
              _this.autoAddSplitPlayerWinners = _this.autoAddSplitPlayerWinners + " -> data added successfully " + number;
              _this.addSubSplitPlayers(data,number,detectVariable);
            }
            else if(detectVariable == "getAdd"){
              _this.messageGetAddSplitPlayers = _this.messageGetAddSplitPlayers + " -> data added successfully " + number;
              _this.addSubSplitPlayers(data,number,detectVariable);
            }
            else{
              _this.manualAddSplitPlayer = _this.manualAddSplitPlayer + " -> data added successfully " + number;
              _this.addSubSplitPlayers(data,number,detectVariable);
            }
          }
          else{
            if(detectVariable == "register")
            {
              _this.autoAddSplitPlayer = _this.autoAddSplitPlayer + " -> error occur -----> done";
            }
            else if(detectVariable == "winners"){
              _this.autoAddSplitPlayerWinners = _this.autoAddSplitPlayerWinners + " -> error occur -----> done";
            }
            else if(detectVariable == "getAdd"){
              _this.messageGetAddSplitPlayers = _this.messageGetAddSplitPlayers + " -> error occur -----> done";
            }
            else{
              _this.manualAddSplitPlayer = _this.manualAddSplitPlayer + " -> error occur -----> done";
            }
          }
        });
      },10000);
    }
    else{
      if(detectVariable == "register")
      {
        this.autoAddSplitPlayer = this.autoAddSplitPlayer + " => done";
        this.disableButton = false;
      }
      else if(detectVariable == "winners"){
        this.autoAddSplitPlayerWinners = this.autoAddSplitPlayerWinners + " => done";
        this.disableButton = false;
      }
      else if(detectVariable == "getAdd"){
        this.contuneGetAddSplitPlayers();
      }
      else{
        this.manualAddSplitPlayer = this.manualAddSplitPlayer + " => done";
        this.disableButton = false;
      }
    }
  }
  addSubTempSplitPlayers(data:Array<object> , number:number , detectPlaceReturn:string , splitPlayersAutoWinners:NgForm){
    if(data.length != 0){
      let _this = this;
      number++;
      setTimeout(function () {
        let subData = data.splice(0,50);
        _this.duoAdmin.addTempSplitPlayer(subData,_this.confirmRequest).subscribe((data1:{finish:boolean})=>{
          if(data1.finish == true){
            if(detectPlaceReturn == "winners")
            {
              _this.autoAddSplitPlayerWinners = _this.autoAddSplitPlayerWinners + " -> data added successfully " + number;
              _this.addSubTempSplitPlayers(data,number,detectPlaceReturn , splitPlayersAutoWinners);
            }
            else{
              _this.manualAddSplitPlayer = _this.manualAddSplitPlayer + " -> data added successfully " + number;
              _this.addSubTempSplitPlayers(data,number,detectPlaceReturn , null);
            }
          }
          else{
            if(detectPlaceReturn == "winners")
            {
              _this.autoAddSplitPlayerWinners = _this.autoAddSplitPlayerWinners + " -> error occur -----> done";
            }
            else{
              _this.manualAddSplitPlayer = _this.manualAddSplitPlayer + " -> error occur -----> done";
            }
          }
        });
      },10000);
    }
    else{
      if(detectPlaceReturn == "winners")
      {
        this.continueAutoSplitPlayersWinners(splitPlayersAutoWinners);
      }
      else{
        this.continueManulSplitPlayers();
      }
    }
  }
  getSplitPlayer(){
    this.disableButton = true;
    let splitPlayersData:Array<object> = null;
    this.duoAdmin.getSplitPlayer(this.confirmRequest)
    .subscribe((data:Array<object>)=>{
      splitPlayersData = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      if(splitPlayersData.length != 0){
        this.numberSplitPlayer = splitPlayersData.length;
        console.log(splitPlayersData);
      }
      else{
        alert("no split players exist");
      }
      this.disableButton = false;
    });
  }
  getSplitPlayerDate(getSplitPlayersDateForm:NgForm){
    this.disableButton = true;
    let splitPlayersData:Array<object> = null;
    this.duoAdmin.getSplitPlayerDate(getSplitPlayersDateForm.value.date,this.confirmRequest)
    .subscribe((data:Array<object>)=>{
      splitPlayersData = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      if(splitPlayersData.length != 0){
        this.numberSplitPlayerDate = splitPlayersData.length;
        console.log(splitPlayersData);
      }
      else{
        alert("no split players exist");
      }
      this.disableButton = false;
    });
  }
  getAddSplitPlayers(){
    this.disableButton = true;
    let splitPlayersData:Array<object> = null;
    this.duoAdmin.getLastSplitPlayersTempRound(this.confirmRequest)
    .subscribe((data:Array<object>)=>{
      splitPlayersData = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      if(splitPlayersData.length != 0){
        this.messageGetAddSplitPlayers = "get split players temp successfully";
        this.duoAdmin.deleteSplitePlayers(this.confirmRequest).subscribe((data:{finish:boolean})=>{
          if(data.finish == true){
            this.messageGetAddSplitPlayers += " -> delete split players successfully";
            this.addSubSplitPlayers(splitPlayersData , 0 , "getAdd")
          }
          else{
            this.messageGetAddSplitPlayers = "error in delete split players";
          }
        });
      }
      else{
        alert("no data in temp split players table");
      }
    })
  }
  contuneGetAddSplitPlayers(){
    this.duoAdmin.deleteTempSplitPlayersLR(this.confirmRequest).subscribe((data2:{finish:boolean})=>{
      if(data2.finish == true){
        this.messageGetAddSplitPlayers += " -> delete temp split players successfully ---- >done";
      }
      else{
        this.messageGetAddSplitPlayers = "error in delete temp split players";
      }
      this.disableButton = false;
    })
  }
  deleteRegisterPlayers(){
    this.disableButton = true;
    this.duoAdmin.deleteRegisterPlayers(this.confirmRequest).subscribe((data:{finish:boolean})=>{
      if(data.finish == true){
        this.messagedeleteRegisterPlayers = "data deleted successfuly";
      }
      else{
        this.messagedeleteRegisterPlayers = "error occur";
      }
      this.disableButton = false;
    });
  }
  deleteSplitePlayer(){
    this.disableButton = true;
    this.duoAdmin.deleteSplitePlayers(this.confirmRequest).subscribe((data:{finish:boolean})=>{
      if(data.finish == true){
        this.messageDeleteSplitePlayer = "data deleted successfully";
      }
      else{
        this.messageDeleteSplitePlayer = "error occure";
      }
      this.disableButton = false;
    })
  }
  getRegisterHackers(){
    this.disableButton = true;
    let hackerRegisterData:Array<object> = null;
    this.duoAdmin.getRegisterHackers(this.confirmRequest)
    .subscribe((data:Array<object>)=>{
      hackerRegisterData = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      this.numberRegisterHackers = hackerRegisterData.length;
      console.log(hackerRegisterData);
      this.disableButton = false;
    })
  }
  getDataDebendId(hackerEmail:NgForm){
    this.disableButton = true;
    this.duoAdmin.getDataDebendId(hackerEmail.value.hackerPubgId,this.confirmRequest).subscribe((data:Array<object>)=>{
      console.log(data);
      this.disableButton = false;
    });
  }
  pushHacker(hackerData:NgForm){
    this.disableButton = true;
    this.hackersDataArray.push({round:hackerData.value.round,pubgIdTeamLeader:hackerData.value.hackerPubgId ,pubgIdMember:hackerData.value.hackerPubgId , email:hackerData.value.hackerEmail , isWinner :false});
    this.disableButton = false;
  }
  popHacker(){
    this.disableButton = true;
    this.hackersDataArray.pop();
    this.disableButton = false;
  }
  addHackers(){
    this.disableButton = true;
    if(this.hackersDataArray.length != 0)
    {
      this.duoAdmin.addHackers(this.hackersDataArray,this.confirmRequest).subscribe((data:{message:string})=>{
        this.messageHackers = data.message;
        this.hackersDataArray = [];
        this.disableButton = false;
      });
    }
    else{
      alert("add hackers first");
    }
  }
  addHacker(sendOneHackerDataForm:NgForm){
    this.disableButton = true;
    let hackerData = [
      {
        round:sendOneHackerDataForm.value.round ,
        pubgIdTeamLeader:sendOneHackerDataForm.value.hackerPubgId ,
        pubgIdMember:sendOneHackerDataForm.value.hackerPubgId ,
        email:sendOneHackerDataForm.value.hackerEmail,
        isWinner:false
      }
    ]
    this.duoAdmin.addHackers(hackerData,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageHacker = data.message;
      this.disableButton = false;
    });
  }
  getLastHackersRound(){
    this.disableButton = true;
    let hackersData:Array<object> = null;
    this.duoAdmin.getLastHackersRound(this.confirmRequest)
    .subscribe((data:Array<object>)=>{
      hackersData = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      this.numberHackers = hackersData.length;
      console.log(hackersData);
      this.disableButton = false;
    })
  }
  deleteReportHacker(deleteReportHackerForm:NgForm){
    this.disableButton = true;
    this.duoAdmin.deleteReportHacker(deleteReportHackerForm.value.id,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageDeleteReportHacker = data.message;
      this.disableButton = false;
    });
  }
  pushWinnerPubg(winnersData:NgForm){
    this.disableButton = true;
    this.winnersData.push({round:winnersData.value.round,pubgIdTeamLeader:winnersData.value.winnerPubgIdTeamLeader ,pubgIdMember:winnersData.value.winnerPubgIdMember , email:"playtogain2020@gmail.com" , isWinner :true});
    this.disableButton = false;
  }
  popWinnerPubg(){
    this.disableButton = true;
    this.winnersData.pop();
    this.disableButton = false;
  }
  addWinners(){
    this.disableButton = true;
    if(this.winnersData.length != 0)
    {
      this.duoAdmin.addWinners(this.winnersData,this.confirmRequest).subscribe((data:{message:string})=>{
        this.messageWinners = data.message;
        this.winnersData = [];
        this.disableButton = false;
      });
    }
    else{
      alert("add hackers first");
    }
  }
  addWinner(sendOneWinnerDataForm:NgForm){
    this.disableButton = true;
    let winnerData =[
      {
        round:sendOneWinnerDataForm.value.round ,
        pubgIdTeamLeader:sendOneWinnerDataForm.value.winnerPubgIdTeamLeader ,
        pubgIdMember:sendOneWinnerDataForm.value.winnerPubgIdMember,
        email:"playtogain2020@gmail.com",
        isWinner:true
      }
    ]
    this.duoAdmin.addWinners(winnerData,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageWinner = data.message;
      this.disableButton = false;
    });
  }
  getLastWinnersRound(){
    this.disableButton = true;
    let winnersData:Array<object> = null;
    this.duoAdmin.getLastWinnersRound(this.confirmRequest)
    .subscribe((data:Array<object>)=>{
      winnersData = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      this.numberwinners = winnersData.length;
      console.log(winnersData);
      this.disableButton = false;
    })
  }
  deleteWinner(deleteWinnerForm:NgForm){
    this.disableButton = true;
    this.duoAdmin.deleteWinner(deleteWinnerForm.value.id,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageDeleteWinner = data.message;
      this.disableButton = false;
    });
  }
  addDeleteHackersAndWinners(){
    this.disableButton = true;
    let HackersAndWinnersData:Array<object> = null;
    this.duoAdmin.getLastHackersAndWinnersRound(this.confirmRequest)
    .subscribe((data:Array<object>)=>{
      HackersAndWinnersData = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      if(HackersAndWinnersData.length != 0)
      {
        this.messageAddDeleteHackersWinners = "data get from  hackers and winners table successfully";
        this.addSubTempHackersAndWinners(HackersAndWinnersData , 0);
      }
      else{
        alert("no data in table hackers and winners")
      }
    })
  }
  continueAddDeleteHackersAndWinners(){
    this.duoAdmin.deleteHackersAndWinners(this.confirmRequest).subscribe((data:{finish:boolean})=>{
      if(data.finish == true){
        this.messageAddDeleteHackersWinners += " -> data deleted successfully -----> done";
      }
      else{
        this.messageAddDeleteHackersWinners = "error in delete data in hackers and winners table";
      }
      this.disableButton = false;
    });
  }
  getAddHackersAndWinners(){
    this.disableButton = true;
    let HackersAndWinnersData:Array<object> = null;
    this.duoAdmin.getLastHackersAndWinnersTempRound(this.confirmRequest)
    .subscribe((data:Array<object>)=>{
      HackersAndWinnersData = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      if(HackersAndWinnersData.length != 0){
        this.messageGetAddHackersWinners = "get hackers and winners temp successfully";
        this.duoAdmin.deleteHackersAndWinners(this.confirmRequest).subscribe((data:{finish:boolean})=>{
          if(data.finish == true){
            this.messageGetAddHackersWinners += " -> delete hackers and winners successfully";
            this.addSubHackersAndWinners(HackersAndWinnersData , 0);
          }
          else{
            this.messageGetAddHackersWinners = "error in delete hacker and winners";
          }
        });
      }
      else{
        alert("no data in temp hackers and winners table");
      }
    })
  }
  continueGetAddHackersAndWinners(){
    this.duoAdmin.deleteTempHackersAndWinnersLR(this.confirmRequest).subscribe((data2:{finish:boolean})=>{
      if(data2.finish == true){
        this.messageGetAddHackersWinners += " -> delete temp hackers and winners successfully ---- >done";
      }
      else{
        this.messageGetAddHackersWinners = "error in delete temp hackers and winners";
      }
      this.disableButton = false;
    })
  }
  addSubHackersAndWinners(data:Array<object> , number:number){
    if(data.length != 0){
      let _this = this;
      number++;
      setTimeout(function () {
        let subData = data.splice(0,5000);
        _this.duoAdmin.addHackersAndWinners(subData,_this.confirmRequest).subscribe((data1:{finish:boolean})=>{
          if(data1.finish == true){
            _this.messageGetAddHackersWinners = _this.messageGetAddHackersWinners + " -> data added successfully " + number;
            _this.addSubHackersAndWinners(data,number);
          }
          else{
            _this.messageGetAddHackersWinners = _this.messageGetAddHackersWinners + " -> error occur -----> done";
          }
        });
      },10000);
    }
    else{
      this.continueGetAddHackersAndWinners();
    }
  }
  addSubTempHackersAndWinners(data:Array<object> , number:number){
    if(data.length != 0){
      let _this = this;
      number++;
      setTimeout(function () {
        let subData = data.splice(0,5000);
        _this.duoAdmin.addTempHackersAndWinners(subData,_this.confirmRequest).subscribe((data1:{finish:boolean})=>{
          if(data1.finish == true){
            _this.messageAddDeleteHackersWinners = _this.messageAddDeleteHackersWinners + " -> data added successfully " + number;
            _this.addSubTempHackersAndWinners(data,number);
          }
          else{
            _this.messageAddDeleteHackersWinners = _this.messageAddDeleteHackersWinners + " -> error occur -----> done";
          }
        });
      },10000);
    }
    else{
      this.continueAddDeleteHackersAndWinners();
    }
  }
  deleteHackersAndWinners(){
    this.disableButton = true;
    this.duoAdmin.deleteHackersAndWinners(this.confirmRequest).subscribe((data:{finish:boolean})=>{
      if(data.finish == true){
        this.messageDeleteHackersAndWinners = "data deleted successfully";
      }
      else{
        this.messageDeleteHackersAndWinners = "error occur";
      }
      this.disableButton = false;
    });
  }
  getAddBlackList(){
    this.disableButton = true;
    let hackersData:Array<{pubgIdTeamLeader:string,pubgIdMember:string,email:string}> = null;
    this.duoAdmin.getAllTempHackers(this.confirmRequest)
    .subscribe((data:Array<{pubgIdTeamLeader:string,pubgIdMember:string,email:string}>)=>{
      hackersData = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      let subHackersData:Array<{pubgIdTeamLeader:string,pubgIdMember:string,email:string}> = null;
      this.messageGetAddBlackList = "data get from hacker temp table successfully";
      this.duoAdmin.getAllHackers(this.confirmRequest)
      .subscribe((data1:Array<{pubgIdTeamLeader:string,pubgIdMember:string,email:string}>)=>{
        subHackersData = data1;
      },error=>this.dialog.open(ErrorComponent)
      ,()=>{
        this.messageGetAddBlackList += " -> data get from hacker table successfully";
        let hackersAdded:Array<object> = [];
        for (let index = 0; index < subHackersData.length; index++) {
          const element = subHackersData[index];
          hackersData.push(element);
        }
        for (let index = 0; index < hackersData.length; index++) {
          const element = hackersData[index];
          hackersAdded.push({pubgId:element.pubgIdTeamLeader , email:element.email});
        }
        this.addSubBlackList(hackersAdded , 0);
      })
    })
  }
  addSubBlackList(data:Array<object> , number:number){
    if(data.length != 0){
      let _this = this;
      number++;
      setTimeout(function () {
        let subData = data.splice(0,5000);
        _this.duoAdmin.addSubBlackList(subData,_this.confirmRequest).subscribe((messageData:{message:string})=>{
          _this.messageGetAddBlackList = _this.messageGetAddBlackList + " -> " + messageData.message + number;
          _this.addSubBlackList(data,number);
        });
      },10000);
    }
    else{
      this.messageGetAddBlackList = this.messageGetAddBlackList + " => done";
      this.disableButton = false;
    }
  }
  pushPhonesNumbers(phonesNumbersForm:NgForm){
    this.disableButton = true;
    this.phonesNumbersData.push({phone:phonesNumbersForm.value.PhoneNumber});
    this.disableButton = false;
  }
  popPhonesNumbers(){
    this.disableButton = true;
    this.phonesNumbersData.pop();
    this.disableButton = false;
  }
  addPhonesNumbers(){
    this.disableButton = true;
    if(this.phonesNumbersData.length != 0)
    {
      this.duoAdmin.addPhonesNumbers(this.phonesNumbersData,this.confirmRequest).subscribe((data:{message:string})=>{
        this.messagePhonesNumbers = data.message;
        this.phonesNumbersData = [];
        this.disableButton = false;
      });
    }
    else{
      alert("add phones first");
    }
  }
  addPhoneNumber(addPhoneNumberForm:NgForm){
    this.disableButton = true;
    let phoneData =[
      {
        phone:addPhoneNumberForm.value.PhoneNumber
      }
    ]
    this.duoAdmin.addPhonesNumbers(phoneData,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageAddPhoneNumber = data.message;
      this.disableButton = false;
    });
  }
  getAllPhonesNumbers(){
    this.disableButton = true;
    let phonesNumbersData:Array<object> = null;
    this.duoAdmin.getAllPhonesNumbers(this.confirmRequest)
    .subscribe((data:Array<object>)=>{
      phonesNumbersData = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      this.numberGetAllPhonesNumbers = phonesNumbersData.length;
      console.log(phonesNumbersData);
      this.disableButton = false;
    });
  }
  getPhoneNumberPhones(getPhoneNumberPhonesForm:NgForm){
    this.disableButton = true;
    let PhoneNumberData:{message:string , phone:string} = null;
    this.duoAdmin.getPhoneNumberPhones(getPhoneNumberPhonesForm.value.PhoneNumber,this.confirmRequest)
    .subscribe((data:{message:string , phone:string})=>{
      PhoneNumberData = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      this.messageGetPhoneNumberPhones = PhoneNumberData.message;
      console.log(PhoneNumberData.phone);
      this.disableButton = false;
    });
  }
  getPhoneNumberRegister(getPhoneNumberRegisterForm:NgForm){
    this.disableButton = true;
    let PhoneNumberData:{message:string , player:object} = null;
    this.duoAdmin.getPhoneNumberRegister(getPhoneNumberRegisterForm.value.PhoneNumber,this.confirmRequest)
    .subscribe((data:{message:string , player:object})=>{
      PhoneNumberData = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      this.messageGetPhoneNumberRegister = PhoneNumberData.message;
      console.log(PhoneNumberData.player);
      this.disableButton = false;
    });
  }
  getPlayersNotPhones(){
    this.disableButton = true;
    let playersData:Array<{phoneTeamLeader:string , phoneMember:string}> = [];
    this.duoAdmin.getRegisterPlayersData(this.confirmRequest)
    .subscribe((data:Array<{phoneTeamLeader:string , phoneMember:string}>)=>{
      playersData = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      let phonesData:Array<{phone:string}> = [];
      this.duoAdmin.getAllPhonesNumbers(this.confirmRequest)
      .subscribe((data1:Array<{phone:string}>)=>{
        phonesData = data1;
      },error=>this.dialog.open(ErrorComponent)
      ,()=>{
        let playersNotPayTeamLeader:Array<object> = [];
        let playersNotPayMember:Array<object> = [];
        let flag:boolean = false;
        for (let index = 0; index < playersData.length; index++) {
          const element = playersData[index];
          for (let index1 = 0; index1 < phonesData.length; index1++) {
            const element1 = phonesData[index1];
            if(element.phoneTeamLeader == element1.phone){
              flag = true;
              break;
            }
          }
          if(flag == false){
            playersNotPayTeamLeader.push(element);
          }
          flag = false;
        }
        for (let index = 0; index < playersData.length; index++) {
          const element = playersData[index];
          for (let index1 = 0; index1 < phonesData.length; index1++) {
            const element1 = phonesData[index1];
            if(element.phoneMember == element1.phone){
              flag = true;
              break;
            }
          }
          if(flag == false){
            playersNotPayMember.push(element);
          }
          flag = false;
        }
        this.numberGetPlayersNotPhones = playersNotPayTeamLeader.length + playersNotPayMember.length;
        console.log("------team leader not pay ------");
        console.log(playersNotPayTeamLeader);
        console.log("--------------------------------------");
        console.log("------member not pay ------");
        console.log(playersNotPayMember);
        this.disableButton = false;
      });
    });
  }
  deletePhoneNumber(deletePhoneNumberForm:NgForm){
    this.disableButton = true;
    this.duoAdmin.deletePhoneNumber(deletePhoneNumberForm.value.PhoneNumber,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageDeletePhoneNumber = data.message;
      this.disableButton = false;
    });
  }
  deleteAllPhonesNumbers(){
    this.disableButton = true;
    this.duoAdmin.deleteAllPhonesNumbers(this.confirmRequest).subscribe((data:{finish:boolean})=>{
      if(data.finish == true){
        this.messageDeleteAllPhonesNumbers = "data deleted successfuly";
      }
      else{
        this.messageDeleteAllPhonesNumbers = "error occur";
      }
      this.disableButton = false;
    });
  }
  getSpecificRamadan(getSpecificRamadanForm:NgForm){
    this.disableButton = true;
    this.groupsRamadan = [];
    let date = getSpecificRamadanForm.value.date;
    let time = getSpecificRamadanForm.value.time;
    this.duoAdmin.getSpecificRamadan(date , time , this.confirmRequest)
    .subscribe((data:Array<{round:number,groupNumber:number,groupPlayers:Array<{pubgIdTeamLeader:string,pubgIdMember:string}>, date:string , time:number}>)=>{
      this.groupsRamadan = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      console.log(this.groupsRamadan);
      this.disableButton = false;
    })
  }
  deletePlayerGroupRamadan(deletePlayerGroupRamadanForm:NgForm){
    this.messagedeletePlayerRamadan = null;
    let indexPlayer:number = -1;
    if(this.groupsRamadan.length != 0)
    {
      for (let index = 0; index < this.groupsRamadan.length; index++) {
        indexPlayer = -1;
        for (let subIndex = 0; subIndex < this.groupsRamadan[index].groupPlayers.length; subIndex++) {
          const element = this.groupsRamadan[index].groupPlayers[subIndex];
          if(element.pubgIdTeamLeader == deletePlayerGroupRamadanForm.value.deletePubgId || element.pubgIdMember == deletePlayerGroupRamadanForm.value.deletePubgId)
          {
            indexPlayer = subIndex;
            break;
          }
        }
        if (indexPlayer > -1) {
          this.groupsRamadan[index].groupPlayers.splice(indexPlayer, 1);
          this.messagedeletePlayerRamadan += "---> player deleted successfully from array number "+index;
        }
        else{
          this.messagedeletePlayerRamadan += "---> no player with this id in array number "+index;
        }
      }
    }
    else{
      this.messagedeletePlayerRamadan = "no players in array";
    }
  }
  searchPlayerGroupRamadan(searchPlayerGroupRamadanForm:NgForm){
    this.messageSearchPlayerRamadan = null;
    let indexPlayer:number = -1;
    if(this.groupsRamadan.length != 0)
    {
      for (let index = 0; index < this.groupsRamadan.length; index++) {
        indexPlayer = -1;
        for (let subIndex = 0; subIndex < this.groupsRamadan[index].groupPlayers.length; subIndex++) {
          const element = this.groupsRamadan[index].groupPlayers[subIndex];
          if(element.pubgIdTeamLeader == searchPlayerGroupRamadanForm.value.deletePubgId || element.pubgIdMember == searchPlayerGroupRamadanForm.value.deletePubgId)
          {
            indexPlayer = subIndex;
            break;
          }
        }
        if (indexPlayer > -1) {
          this.messageSearchPlayerRamadan += "---> player exist in array number "+index;
        }
        else{
          this.messageSearchPlayerRamadan += "---> player not exist in array number "+index;
        }
      }
    }
    else{
      this.messageSearchPlayerRamadan = "no players in array";
    }
  }
  addSpecificRamadan(addSpecificRamadanForm:NgForm){
    this.disableButton = true;
    if(this.groupsRamadan.length != 0){
      let date = addSpecificRamadanForm.value.date;
      let time = addSpecificRamadanForm.value.time;
      for (let index = 0; index < this.groupsRamadan.length; index++) {
        const element = this.groupsRamadan[index];
        element.date = date;
        element.time = time;
      }
      this.duoAdmin.addSpecificRamadan(this.groupsRamadan , this.confirmRequest)
      .subscribe((data:string)=>{
        this.messageAddRamadanGroup = data;
        this.disableButton = false;
      },error=>this.dialog.open(ErrorComponent))
    }
    else{
      alert("no data in groupsRamadan array");
    }
  }
  deleteSpecificRamadan(deleteSpecificRamadanForm:NgForm){
    this.disableButton = true;
    let date = deleteSpecificRamadanForm.value.date;
    let time = deleteSpecificRamadanForm.value.time;
    this.duoAdmin.deleteSpecificRamadan(date , time , this.confirmRequest)
    .subscribe((data:string)=>{
      this.messageDeleteRamadanGroup = data;
      this.disableButton = false;
    },error=>this.dialog.open(ErrorComponent))
  }
  getTimeSpecificRamadan(getTimeSpecificRamadanForm:NgForm){
    this.disableButton = true;
    let time = getTimeSpecificRamadanForm.value.time;
    let groupsData:Array<object> = [];
    this.duoAdmin.getTimeSpecificRamadan(time , this.confirmRequest)
    .subscribe((data:Array<object>)=>{
      groupsData = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      this.numberTimeGroupsRamadan = groupsData.length;
      console.log(groupsData);
      this.disableButton = false;
    })
  }
  getAllPlayersData(){
    this.disableButton = true;
    this.duoAdmin.getAllPlayersData(this.confirmRequest)
    .subscribe((data:object)=>{
      console.log(data);
      this.disableButton = false;
    },error=>this.dialog.open(ErrorComponent))
  }
  getAddTotalPlayers(){
    this.disableButton = true;
    let getPubgIdsArray:Array<object> = [];
    this.duoAdmin.getIdsPubgRegister(this.confirmRequest).subscribe(data=>{
      getPubgIdsArray = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      this.duoAdmin.addTotalPlayersServer(getPubgIdsArray.length,this.confirmRequest).subscribe((data:{message:string})=>{
        this.messageGetAddTotalPlayers = data.message;
        this.disableButton = false;
      });
    })
  }
  openButtons(){
    this.disableButton = false;
  }
  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  } 
  /*test*/
  addPlayersTest(){
    this.duoAdmin.addPlayersTest(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageTest = data.message;
      this.disableButton = false;
    },error=>this.dialog.open(ErrorComponent))
  }
}