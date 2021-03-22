import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {soloAdmin} from './soloAdmin.service'
import {ErrorComponent} from '../../error/error.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-adminsolopubg',
  templateUrl: './adminsolopubg.component.html',
  styleUrls: ['./adminsolopubg.component.css']
})
export class AdminsolopubgComponent implements OnInit {

  constructor(private soloAdmin:soloAdmin , private dialog:MatDialog) { }

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
  registerChampionshipType:boolean = null;
  registerFreeAdsType:boolean = null;
  registerReportHackerType:boolean = null;
  appearHackerAndWinnersPubg:boolean = null;
  splitPlayersType:boolean = null;
  registerChampionshipTypeServer:boolean = null;
  registerFreeAdsTypeServer:boolean = null;
  registerReportHackerTypeServer:boolean = null;
  appearHackerAndWinnersPubgServer:boolean = null;
  splitPlayersTypeServer:boolean = null;
  existPaidAdsServer:boolean = null;
  setChampionshipTypeTrueRadio:boolean = false;
  setFreeAdsTypeTrueRadio:boolean = false;
  setReportHackerTypeTrueRadio:boolean = false;
  setAppearHackerAndWinnersTrueRadio:boolean = false;
  setSplitPlayersTypeTrueRadio:boolean = false;
  setChampionshipTypeFalseRadio:boolean = false;
  setFreeAdsTypeFalseRadio:boolean = false;
  setReportHackerTypeFalseRadio:boolean = false;
  setAppearHackerAndWinnersFalseRadio:boolean = false;
  setSplitPlayersTypeFalseRadio:boolean = false;
  messageChampionshipTypeTrue:string = null;
  messageFreeAdsTypeTrue:string = null;
  messageReportHackerTypeTrue:string = null;
  messageAppearHackerAndWinnersTrue:string = null;
  messageSplitPlayersTypeTrue:string = null;
  messageChampionshipTypeFalse:string = null;
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
  emailHacker:string = null;
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
  PubgIdsGroup:Array<{pubgId:string}> = [];
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
  groupsRamadan:Array<{round:number,groupNumber:number,groupPlayers:Array<{pubgId:string}>, date:string , time:number}> = [];
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
      this.soloAdmin.addChampion(addChampionForm.value.startDate,addChampionForm.value.totalPlayers,addChampionForm.value.playerCountry,this.confirmRequest)
      .subscribe((data:{message:string})=>{
        this.messageAddChampion = data.message;
        this.disableButton = false;
      });
    }
  }
  endChampion(){
    this.disableButton = true;
    this.soloAdmin.deleteChampionShips(this.confirmRequest).subscribe((data1:{finish:boolean})=>{
      if(data1.finish == true){
        this.messageEndChampion = "championships delete successfully";
        this.soloAdmin.deleteHackersAndWinners(this.confirmRequest).subscribe((data2:{finish:boolean})=>{
          if(data2.finish == true){
            this.messageEndChampion += " -> hackers and winners delete successfully";
            this.soloAdmin.deleteRegisterFreeAds(this.confirmRequest).subscribe((data3:{finish:boolean})=>{
              if(data3.finish == true){
                this.messageEndChampion += " -> register free ads delete successfully";
                this.soloAdmin.deleteRegisterHackers(this.confirmRequest).subscribe((data4:{finish:boolean})=>{
                  if(data4.finish == true){
                    this.messageEndChampion += " -> register hackers delete successfully";
                    this.soloAdmin.deleteRegisterPlayers(this.confirmRequest).subscribe((data5:{finish:boolean})=>{
                      if(data5.finish == true){
                        this.messageEndChampion += " -> register players delete successfully";
                        this.soloAdmin.deleteSplitePlayers(this.confirmRequest).subscribe((data6:{finish:boolean})=>{
                          if(data6.finish == true){
                            this.messageEndChampion += " -> splite players delete successfully";
                            this.soloAdmin.deleteTempHackersAndWinners(this.confirmRequest).subscribe((data7:{finish:boolean})=>{
                              if(data7.finish == true){
                                this.messageEndChampion += " -> temp hackers and winners delete successfully";
                                this.soloAdmin.deleteTempSplitePlayers(this.confirmRequest).subscribe((data8:{finish:boolean})=>{
                                  if(data8.finish == true){
                                    this.messageEndChampion += " -> temp splite players delete successfully";
                                    this.soloAdmin.setAllServerRefFalse(this.confirmRequest).subscribe((data:{finish:boolean})=>{
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
    this.soloAdmin.deleteEmails(this.confirmRequest).subscribe((data:{finish:boolean})=>{
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
    this.soloAdmin.getCharityAdsTable(this.confirmRequest)
    .subscribe((data:Array<object>)=>{
      adsData = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      this.soloAdmin.addCharityAds(adsData,this.confirmRequest).subscribe((data:{message:string})=>{
        this.messageAddCharityAds = data.message;
        this.disableButton = false;
      });
    })
  }
  getCharityAds(){
    this.disableButton = true;
    let adsData:Array<object> = null;
    this.soloAdmin.getCharityAds(this.confirmRequest)
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
    this.soloAdmin.getCharityAdsServer(this.confirmRequest)
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
    this.soloAdmin.deleteCharityAds(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageDeleteCharityAds = data.message;
      this.disableButton = false;
    });
  }
  getAddPaidAds(){
    this.disableButton = true;
    let getAds:Array<{_id:string}> = null;
    let addAds:Array<string> = [];
    this.soloAdmin.getPaidAds(this.confirmRequest)
    .subscribe((data:Array<{_id:string}>)=>{
      getAds = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      if(getAds.length != 0){
        for (let index = 0; index < getAds.length; index++) {
          const element = getAds[index];
          addAds.push(element._id);
        }
        this.soloAdmin.addPaidAds(addAds,this.confirmRequest)
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
    this.soloAdmin.getNumberPaidAds(getNumberAddPaidAdsForm.value.number,this.confirmRequest)
    .subscribe((data:Array<{_id:string}>)=>{
      getAds = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      if(getAds.length != 0){
        for (let index = 0; index < getAds.length; index++) {
          const element = getAds[index];
          addAds.push(element._id);
        }
        this.soloAdmin.addPaidAds(addAds,this.confirmRequest)
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
    this.soloAdmin.addPaidAd(paidAd,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageAddPaidAd = data.message;
      this.disableButton = false;
    });
  }
  getPaidAds(){
    this.disableButton = true;
    let paidAds:Array<{_id:string}> = null;
    this.soloAdmin.getPaidAds(this.confirmRequest)
    .subscribe((data:Array<{_id:string}>)=>{
      paidAds = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      this.numberPaidAdsNotComplete = paidAds.length;
      console.log(paidAds);
      this.disableButton = false;
    })
  }
  getSoloPaidAds(){
    this.disableButton = true;
    let soloPaidAds:Array<{_id:string}> = null;
    this.soloAdmin.getSoloPaidAds(this.confirmRequest)
    .subscribe((data:Array<{_id:string}>)=>{
      soloPaidAds = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      this.numberPaidAds = soloPaidAds.length;
      console.log(soloPaidAds);
      this.disableButton = false;
    })
  }
  deletePaidAds(){
    this.disableButton = true;
    this.soloAdmin.deletePaidAds(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageDeletePaidAds = data.message;
      this.disableButton = false;
    });
  }
  deletePaidAd(deletePaidAdForm:NgForm){
    this.disableButton = true;
    this.soloAdmin.deletePaidAd(deletePaidAdForm.value.id,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageDeletePaidAd = data.message;
      this.disableButton = false;
    });
  }
  getAllAddBlackList(){
    this.disableButton = true;
    this.soloAdmin.getAllAddBlackList(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageGetAllAddBlackList = data.message;
      this.disableButton = false;
    });
  }
  getRandomAddBlackList(getRandomAddBlackListForm:NgForm){
    this.disableButton = true;
    this.soloAdmin.getRandomAddBlackList(getRandomAddBlackListForm.value.numberPlayers,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageGetRandomAddBlackList = data.message;
      this.disableButton = false;
    });
  }
  getAllBlackList(){
    this.disableButton = true;
    let AllBlackList:Array<object> = null;
    this.soloAdmin.getAllBlackList(this.confirmRequest)
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
    this.soloAdmin.deleteAllBlackList(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageDeleteAllBlackList = data.message;
      this.disableButton = false;
    });
  }
  getPagesStates(){
    this.disableButton = true;
    this.soloAdmin.getSoloPagesStates(this.confirmRequest).subscribe((data:{exist:boolean,error:boolean,
      registerChampionshipType:boolean,
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
        this.registerChampionshipType = data.registerChampionshipType;
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
    this.soloAdmin.getSoloPagesStatesServer(this.confirmRequest).subscribe((data:{
      registerChampionshipType:boolean,
      registerFreeAdsType:boolean,
      registerReportHackerType:boolean,
      appearHackerAndWinnersPubg:boolean,
      splitPlayersType:boolean,
      existPaidAds:boolean,
      showAdsWillAppear:boolean,
      phonesAcceptPlayers:boolean}) =>{
        this.registerChampionshipTypeServer = data.registerChampionshipType;
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
  
  setChampionshipTypeTrue(){
    this.disableButton = true;
    this.soloAdmin.setChampionshipTypetrue(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageChampionshipTypeTrue = data.message;
      this.disableButton = false;
    });
  }
  setFreeAdsTypeTrue(){
    this.disableButton = true;
    this.soloAdmin.setFreeAdsTypeTrue(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageFreeAdsTypeTrue = data.message;
      this.disableButton = false;
    });
  }
  setReportHackerTypeTrue(){
    this.disableButton = true;
    this.soloAdmin.setReportHackerTypeTrue(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageReportHackerTypeTrue = data.message;
      this.disableButton = false;
    });
  }
  setAppearHackerAndWinnersTrue(){
    this.disableButton = true;
    this.soloAdmin.setAppearHackerAndWinnersTrue(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageAppearHackerAndWinnersTrue = data.message;
      this.disableButton = false;
    });
  }
  setSplitPlayersTypeTrue(){
    this.disableButton = true;
    this.soloAdmin.setSplitPlayersTypeTrue(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageSplitPlayersTypeTrue = data.message;
      this.disableButton = false;
    });
  }
  setExistPaidAdsTrue(){
    this.disableButton = true;
    this.soloAdmin.setExistPaidAdsTrue(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageExistPaidAdsTrue = data.message;
      this.disableButton = false;
    });
  }
  setShowAdsWillAppearTrue(){
    this.disableButton = true;
    this.soloAdmin.setShowAdsWillAppearTrue(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageShowAdsWillAppearTrue = data.message;
      this.disableButton = false;
    });
  }
  setPhonesAcceptPlayersTrue(){
    this.disableButton = true;
    this.soloAdmin.setPhonesAcceptPlayersTrue(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messagePhonesAcceptPlayersTrue = data.message;
      this.disableButton = false;
    });
  }
  setChampionshipTypeFalse(){
    this.disableButton = true;
    this.soloAdmin.setChampionshipTypeFalse(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageChampionshipTypeFalse = data.message;
      this.disableButton = false;
    });
  }
  setFreeAdsTypeFalse(){
    this.disableButton = true;
    this.soloAdmin.setFreeAdsTypeFalse(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageFreeAdsTypeFalse = data.message;
      this.disableButton = false;
    });
  }
  setReportHackerTypeFalse(){
    this.disableButton = true;
    this.soloAdmin.setReportHackerTypeFalse(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageReportHackerTypeFalse = data.message;
      this.disableButton = false;
    });
  }
  setAppearHackerAndWinnersFalse(){
    this.disableButton = true;
    this.soloAdmin.setAppearHackerAndWinnersFalse(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageAppearHackerAndWinnersFalse = data.message;
      this.disableButton = false;
    });
  }
  setSplitPlayersTypeFalse(){
    this.disableButton = true;
    this.soloAdmin.setSplitPlayersTypeFalse(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageSplitPlayersTypeFalse = data.message;
      this.disableButton = false;
    });
  }
  setExistPaidAdsFalse(){
    this.disableButton = true;
    this.soloAdmin.setExistPaidAdsFalse(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageExistPaidAdsFalse = data.message;
      this.disableButton = false;
    });
  }
  setShowAdsWillAppearFalse(){
    this.disableButton = true;
    this.soloAdmin.setShowAdsWillAppearFalse(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageShowAdsWillAppearFalse = data.message;
      this.disableButton = false;
    });
  }
  setPhonesAcceptPlayersFalse(){
    this.disableButton = true;
    this.soloAdmin.setPhonesAcceptPlayersFalse(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messagePhonesAcceptPlayersFalse = data.message;
      this.disableButton = false;
    });
  }
  getAddPagesStates(){
    this.disableButton = true;
    this.soloAdmin.getAddPagesStates(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageGetAddPagesStates = data.message;
      this.disableButton = false;
    });
  }
  getRegisterAds(){
    this.disableButton = true;
    let adsData:Array<{videoId:string, email:string, adAppearanceCountry:string}> = null;
    this.soloAdmin.getRegisterAds(this.confirmRequest)
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
    this.soloAdmin.getAdsWillAppear(freeAds.value.numberAds,this.confirmRequest)
    .subscribe((data:Array<object>)=>{
      addAdsWillAppear = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      if(addAdsWillAppear.length != 0){
        this.soloAdmin.addAdsWillAppear(addAdsWillAppear,this.confirmRequest)
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
    this.soloAdmin.addFreeAd(videoId ,addFreeAdForm.value.email , addFreeAdForm.value.adCountry,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageAddFreeAd = data.message;
      this.disableButton = false;
    });
  }
  getRealAdsWillAppear(){
    this.disableButton = true;
    let adsData:Array<object> = null;
    this.soloAdmin.getRealAdsWillAppear(this.confirmRequest)
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
    this.soloAdmin.getRealAdsWillAppearServer(this.confirmRequest)
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
    this.soloAdmin.deleteAdsWillAppear(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageDeleteFreeAds = data.message;
      this.disableButton = false;
    });
  }
  deleteFreeAd(deleteFreeAdForm:NgForm){
    this.disableButton = true;
    this.soloAdmin.deleteFreeAd(deleteFreeAdForm.value.id,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageDeleteFreeAd = data.message;
      this.disableButton = false;
    });
  }
  adsFromDatabaseToServer(){
    this.disableButton = true;
    this.soloAdmin.adsFromDatabaseToServer(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageAddAdsToServer = data.message;
      this.disableButton = false;
    });
  }
  deleteAllRegisterFree(){
    this.disableButton = true;
    this.soloAdmin.deleteRegisterFreeAds(this.confirmRequest).subscribe((data:{finish:boolean})=>{
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
    this.soloAdmin.addPlayer(addPlayerForm.value.pubgId , addPlayerForm.value.email,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageAddPlayer = data.message;
      this.disableButton = false;
    });
  }
  deletePlayer(deletePlayerForm:NgForm){
    this.disableButton = true;
    this.soloAdmin.deletePlayer(deletePlayerForm.value.pubgId,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageDeletePlayer = data.message;
      this.disableButton = false;
    });
  }
  getPlayersAndCountDays(getPlayersAndCountDaysForm:NgForm){
    this.disableButton = true;
    let getPubgIdsArray:Array<{pubgId:string}> = [];
    this.soloAdmin.getIdsPubg(this.confirmRequest).subscribe(data=>{
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
    let pubgIdsArray:Array<{pubgId:string}> = [];
    this.soloAdmin.getIdsPubg(this.confirmRequest).subscribe(data=>{
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
        let startDay:number=parseInt(splitPlayersAuto.value.dayNumber);
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
        startDayFromFirst = true;
        this.addSubSplitPlayers(data , 0 , "register");
      }
      else{
        alert("no players in database");
      }
    });
  }
  getCountWinners(getCountWinnersForm:NgForm){
    this.disableButton = true;
    let getPubgIdsArray:Array<{pubgId:string}> = [];
    this.soloAdmin.getLastWinnersRound(this.confirmRequest).subscribe(data=>{
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
    this.soloAdmin.getSplitPlayer(this.confirmRequest).subscribe(data=>{
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
    this.soloAdmin.deleteSplitePlayers(this.confirmRequest).subscribe((data1:{finish:boolean})=>{
      if(data1.finish == true){
        this.autoAddSplitPlayerWinners += "delete splite players data successfully";
        let pubgIdsArray:Array<{pubgId:string}> = [];
        this.soloAdmin.getLastWinnersRound(this.confirmRequest).subscribe(data=>{
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
    this.PubgIdsGroup.push({pubgId:idPubgForm.value.pubgId});
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
    this.soloAdmin.getSplitPlayer(this.confirmRequest).subscribe(data=>{
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
    this.soloAdmin.deleteSplitePlayers(this.confirmRequest).subscribe((data1:{finish:boolean})=>{
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
        _this.soloAdmin.addSplitPlayers(subData,_this.confirmRequest).subscribe((data1:{finish:boolean})=>{
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
        _this.soloAdmin.addTempSplitPlayer(subData,_this.confirmRequest).subscribe((data1:{finish:boolean})=>{
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
    this.soloAdmin.getSplitPlayer(this.confirmRequest)
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
    this.soloAdmin.getSplitPlayerDate(getSplitPlayersDateForm.value.date,this.confirmRequest)
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
    this.soloAdmin.getLastSplitPlayersTempRound(this.confirmRequest)
    .subscribe((data:Array<object>)=>{
      splitPlayersData = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      if(splitPlayersData.length != 0){
        this.messageGetAddSplitPlayers = "get split players temp successfully";
        this.soloAdmin.deleteSplitePlayers(this.confirmRequest).subscribe((data:{finish:boolean})=>{
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
    this.soloAdmin.deleteTempSplitPlayersLR(this.confirmRequest).subscribe((data2:{finish:boolean})=>{
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
    this.soloAdmin.deleteRegisterPlayers(this.confirmRequest).subscribe((data:{finish:boolean})=>{
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
    this.soloAdmin.deleteSplitePlayers(this.confirmRequest).subscribe((data:{finish:boolean})=>{
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
    this.soloAdmin.getRegisterHackers(this.confirmRequest)
    .subscribe((data:Array<object>)=>{
      hackerRegisterData = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      this.numberRegisterHackers = hackerRegisterData.length;
      console.log(hackerRegisterData);
      this.disableButton = false;
    })
  }
  getEmailHacker(hackerEmail:NgForm){
    this.disableButton = true;
    this.soloAdmin.getEmailHacker(hackerEmail.value.hackerPubgId,this.confirmRequest).subscribe((data:{message:string})=>{
      this.emailHacker = data.message;
      this.disableButton = false;
    });
  }
  pushHacker(hackerData:NgForm){
    this.disableButton = true;
    this.hackersDataArray.push({round:hackerData.value.round,pubgId:hackerData.value.hackerPubgId , email:hackerData.value.hackerEmail , isWinner :false});
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
      this.soloAdmin.addHackers(this.hackersDataArray,this.confirmRequest).subscribe((data:{message:string})=>{
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
        pubgId:sendOneHackerDataForm.value.hackerPubgId ,
        email:sendOneHackerDataForm.value.hackerEmail,
        isWinner:false
      }
    ]
    this.soloAdmin.addHackers(hackerData,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageHacker = data.message;
      this.disableButton = false;
    });
  }
  getLastHackersRound(){
    this.disableButton = true;
    let hackersData:Array<object> = null;
    this.soloAdmin.getLastHackersRound(this.confirmRequest)
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
    this.soloAdmin.deleteReportHacker(deleteReportHackerForm.value.id,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageDeleteReportHacker = data.message;
      this.disableButton = false;
    });
  }
  pushWinnerPubg(winnersData:NgForm){
    this.disableButton = true;
    this.winnersData.push({round:winnersData.value.round,pubgId:winnersData.value.winnerPubg , email:"playtogain2020@gmail.com" , isWinner :true});
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
      this.soloAdmin.addWinners(this.winnersData,this.confirmRequest).subscribe((data:{message:string})=>{
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
        pubgId:sendOneWinnerDataForm.value.winnerPubgId ,
        email:"playtogain2020@gmail.com",
        isWinner:true
      }
    ]
    this.soloAdmin.addWinners(winnerData,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageWinner = data.message;
      this.disableButton = false;
    });
  }
  getLastWinnersRound(){
    this.disableButton = true;
    let winnersData:Array<object> = null;
    this.soloAdmin.getLastWinnersRound(this.confirmRequest)
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
    this.soloAdmin.deleteWinner(deleteWinnerForm.value.id,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageDeleteWinner = data.message;
      this.disableButton = false;
    });
  }
  addDeleteHackersAndWinners(){
    this.disableButton = true;
    let HackersAndWinnersData:Array<object> = null;
    this.soloAdmin.getLastHackersAndWinnersRound(this.confirmRequest)
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
    this.soloAdmin.deleteHackersAndWinners(this.confirmRequest).subscribe((data:{finish:boolean})=>{
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
    this.soloAdmin.getLastHackersAndWinnersTempRound(this.confirmRequest)
    .subscribe((data:Array<object>)=>{
      HackersAndWinnersData = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      if(HackersAndWinnersData.length != 0){
        this.messageGetAddHackersWinners = "get hackers and winners temp successfully";
        this.soloAdmin.deleteHackersAndWinners(this.confirmRequest).subscribe((data:{finish:boolean})=>{
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
    this.soloAdmin.deleteTempHackersAndWinnersLR(this.confirmRequest).subscribe((data2:{finish:boolean})=>{
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
        _this.soloAdmin.addHackersAndWinners(subData,_this.confirmRequest).subscribe((data1:{finish:boolean})=>{
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
        _this.soloAdmin.addTempHackersAndWinners(subData,_this.confirmRequest).subscribe((data1:{finish:boolean})=>{
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
    this.soloAdmin.deleteHackersAndWinners(this.confirmRequest).subscribe((data:{finish:boolean})=>{
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
    let hackersData:Array<object> = null;
    this.soloAdmin.getAllTempHackers(this.confirmRequest)
    .subscribe((data:Array<object>)=>{
      hackersData = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      let subHackersData:Array<object> = null;
      this.messageGetAddBlackList = "data get from hacker temp table successfully";
      this.soloAdmin.getAllHackers(this.confirmRequest)
      .subscribe((data1:Array<object>)=>{
        subHackersData = data1;
      },error=>this.dialog.open(ErrorComponent)
      ,()=>{
        this.messageGetAddBlackList += " -> data get from hacker table successfully";
        for (let index = 0; index < subHackersData.length; index++) {
          const element = subHackersData[index];
          hackersData.push(element);
        }
        this.addSubBlackList(hackersData , 0);
      })
    })
  }
  addSubBlackList(data:Array<object> , number:number){
    if(data.length != 0){
      let _this = this;
      number++;
      setTimeout(function () {
        let subData = data.splice(0,5000);
        _this.soloAdmin.addSubBlackList(subData,_this.confirmRequest).subscribe((messageData:{message:string})=>{
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
      this.soloAdmin.addPhonesNumbers(this.phonesNumbersData,this.confirmRequest).subscribe((data:{message:string})=>{
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
    this.soloAdmin.addPhonesNumbers(phoneData,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageAddPhoneNumber = data.message;
      this.disableButton = false;
    });
  }
  getAllPhonesNumbers(){
    this.disableButton = true;
    let phonesNumbersData:Array<object> = null;
    this.soloAdmin.getAllPhonesNumbers(this.confirmRequest)
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
    this.soloAdmin.getPhoneNumberPhones(getPhoneNumberPhonesForm.value.PhoneNumber,this.confirmRequest)
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
    let PhoneNumberData:{message:string , email:string , pubgId:string , phone:string , displayedAd:string} = null;
    this.soloAdmin.getPhoneNumberRegister(getPhoneNumberRegisterForm.value.PhoneNumber,this.confirmRequest)
    .subscribe((data:{message:string , email:string , pubgId:string , phone:string , displayedAd:string})=>{
      PhoneNumberData = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      this.messageGetPhoneNumberRegister = PhoneNumberData.message;
      console.log(PhoneNumberData);
      this.disableButton = false;
    });
  }
  getPlayersNotPhones(){
    this.disableButton = true;
    let playersData:Array<{email:string , pubgId:string , phone:string , displayedAd:string}> = [];
    this.soloAdmin.getRegisterPlayersData(this.confirmRequest)
    .subscribe((data:Array<{email:string , pubgId:string , phone:string , displayedAd:string}>)=>{
      playersData = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      let phonesData:Array<{phone:string}> = [];
      this.soloAdmin.getAllPhonesNumbers(this.confirmRequest)
      .subscribe((data1:Array<{phone:string}>)=>{
        phonesData = data1;
      },error=>this.dialog.open(ErrorComponent)
      ,()=>{
        let playersNotPay:Array<object> = [];
        let flag:boolean = false;
        for (let index = 0; index < playersData.length; index++) {
          const element = playersData[index];
          for (let index1 = 0; index1 < phonesData.length; index1++) {
            const element1 = phonesData[index1];
            if(element.phone == element1.phone){
              flag = true;
              break;
            }
          }
          if(flag == false){
            playersNotPay.push(element);
          }
          flag = false;
        }
        this.numberGetPlayersNotPhones = playersNotPay.length;
        console.log(playersNotPay);
        this.disableButton = false;
      });
    });
  }
  deletePhoneNumber(deletePhoneNumberForm:NgForm){
    this.disableButton = true;
    this.soloAdmin.deletePhoneNumber(deletePhoneNumberForm.value.PhoneNumber,this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageDeletePhoneNumber = data.message;
      this.disableButton = false;
    });
  }
  deleteAllPhonesNumbers(){
    this.disableButton = true;
    this.soloAdmin.deleteAllPhonesNumbers(this.confirmRequest).subscribe((data:{finish:boolean})=>{
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
    this.soloAdmin.getSpecificRamadan(date , time , this.confirmRequest)
    .subscribe((data:Array<{round:number,groupNumber:number,groupPlayers:Array<{pubgId:string}>, date:string , time:number}>)=>{
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
          if(element.pubgId == deletePlayerGroupRamadanForm.value.deletePubgId)
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
          if(element.pubgId == searchPlayerGroupRamadanForm.value.deletePubgId)
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
      this.soloAdmin.addSpecificRamadan(this.groupsRamadan , this.confirmRequest)
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
    this.soloAdmin.deleteSpecificRamadan(date , time , this.confirmRequest)
    .subscribe((data:string)=>{
      this.messageDeleteRamadanGroup = data;
      this.disableButton = false;
    },error=>this.dialog.open(ErrorComponent))
  }
  getTimeSpecificRamadan(getTimeSpecificRamadanForm:NgForm){
    this.disableButton = true;
    let time = getTimeSpecificRamadanForm.value.time;
    let groupsData:Array<object> = [];
    this.soloAdmin.getTimeSpecificRamadan(time , this.confirmRequest)
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
    this.soloAdmin.getAllPlayersData(this.confirmRequest)
    .subscribe((data:object)=>{
      console.log(data);
      this.disableButton = false;
    },error=>this.dialog.open(ErrorComponent))
  }
  getAddTotalPlayers(){
    this.disableButton = true;
    let getPubgIdsArray:Array<{pubgId:string}> = [];
    this.soloAdmin.getIdsPubg(this.confirmRequest).subscribe(data=>{
      getPubgIdsArray = data;
    },error=>this.dialog.open(ErrorComponent)
    ,()=>{
      this.soloAdmin.addTotalPlayersServer(getPubgIdsArray.length,this.confirmRequest).subscribe((data:{message:string})=>{
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
    this.soloAdmin.addPlayersTest(this.confirmRequest).subscribe((data:{message:string})=>{
      this.messageTest = data.message;
      this.disableButton = false;
    },error=>this.dialog.open(ErrorComponent))
  }
}
