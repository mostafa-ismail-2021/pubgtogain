import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environment";
const BACKEND_URL = environment.apiUrl + "/solo/";

@Injectable({
    providedIn: 'root'
})
export class soloAdmin {

    constructor(private http:HttpClient) { }
    addChampion(startDate:string,playerNumber:number,playerCountry:string,adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "addChampion" , {startDate:startDate , totalPlayersNumber:playerNumber,playerCountry:playerCountry,adminData:adminData});
    }
    deleteChampionShips(adminData:string){
        return this.http.post<{finish:boolean}>(BACKEND_URL + "deleteChampionShips",{adminData:adminData})
    }
    deleteEmails(adminData:string){
        return this.http.post<{finish:boolean}>(BACKEND_URL + "deleteEmails",{adminData:adminData})
    }
    deleteHackersAndWinners(adminData:string){
        return this.http.post<{finish:boolean}>(BACKEND_URL + "deleteHackersAndWinners",{adminData:adminData})
    }
    deleteRegisterFreeAds(adminData:string){
        return this.http.post<{finish:boolean}>(BACKEND_URL + "deleteRegisterFreeAds",{adminData:adminData})
    }
    deleteRegisterHackers(adminData:string){
        return this.http.post<{finish:boolean}>(BACKEND_URL + "deleteRegisterHackers",{adminData:adminData})
    }
    getLastSplitPlayersTempRound(adminData:string){
        return this.http.post<Array<object>>(BACKEND_URL + "getLastSplitPlayersTempRound",{adminData:adminData});        
    }
    deleteRegisterPlayers(adminData:string){
        return this.http.post<{finish:boolean}>(BACKEND_URL + "deleteRegisterPlayers",{adminData:adminData})
    }
    deleteSplitePlayers(adminData:string){
        return this.http.post<{finish:boolean}>(BACKEND_URL + "deleteSplitePlayers",{adminData:adminData})
    }
    deleteTempHackersAndWinners(adminData:string){
        return this.http.post<{finish:boolean}>(BACKEND_URL + "deleteTempHackersAndWinners",{adminData:adminData})
    }
    deleteTempSplitePlayers(adminData:string){
        return this.http.post<{finish:boolean}>(BACKEND_URL + "deleteTempSplitePlayers",{adminData:adminData})
    }
    setAllServerRefFalse(adminData:string){
        return this.http.post<{finish:boolean}>(BACKEND_URL + "setAllServerRefFalse",{adminData:adminData})
    }
    getCharityAdsTable(adminData:string){
        return this.http.post<Array<object>>(BACKEND_URL + "getCharityAdsTable" , {adminData:adminData})
    }
    addCharityAds(charityAds:Array<object>,adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "addCharityAds" , {charityAds:charityAds,adminData:adminData});
    }
    getCharityAds(adminData:string){
        return this.http.post<Array<object>>(BACKEND_URL + "getCharityAds",{adminData:adminData})
    }
    getCharityAdsServer(adminData:string){
        return this.http.post<{ads:object}>(BACKEND_URL + "getCharityAdsServer",{adminData:adminData})
    }
    deleteCharityAds(adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "deleteCharityAds",{adminData:adminData})
    }
    getPaidAds(adminData:string){
        return this.http.post<Array<{_id:string}>>(BACKEND_URL + "getPaidAds",{adminData:adminData})
    }
    addPaidAds(paidAds:Array<string>,adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "addPaidAds" , {paidAds:paidAds,adminData:adminData});
    }
    getNumberPaidAds(paidAdsNumbers:number,adminData:string){
        return this.http.post<Array<{_id:string}>>(BACKEND_URL + "getNumberPaidAds" , {paidAdsNumbers:paidAdsNumbers,adminData:adminData});
    }
    addPaidAd(paidAd:string,adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "addPaidAd" , {paidAd:paidAd,adminData:adminData});
    }
    getSoloPaidAds(adminData:string){
        return this.http.post<Array<{_id:string}>>(BACKEND_URL + "getSoloPaidAds",{adminData:adminData})
    }
    deletePaidAds(adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "deletePaidAds",{adminData:adminData})
    }
    deletePaidAd(deletePaidAd:string,adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "deletePaidAd" , {deletePaidAd:deletePaidAd,adminData:adminData});
    }
    getAllAddBlackList(adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "getAllAddBlackList",{adminData:adminData});
    }
    getRandomAddBlackList(numberPlayers:number,adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "getRandomAddBlackList" , {numberPlayers:numberPlayers,adminData:adminData});
    }
    getAllBlackList(adminData:string){
        return this.http.post<Array<object>>(BACKEND_URL + "getAllBlackList",{adminData:adminData})
    }
    deleteAllBlackList(adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "deleteAllBlackList",{adminData:adminData});
    }
    getSoloPagesStates(adminData:string){
        return this.http.post<{
            exist:boolean,
            error:boolean,
            registerChampionshipType:boolean,
            registerFreeAdsType:boolean,
            registerReportHackerType:boolean,
            appearHackerAndWinnersPubg:boolean,
            splitPlayersType:boolean,
            existPaidAds:boolean,
            showAdsWillAppear:boolean,
            phonesAcceptPlayers:boolean}>(BACKEND_URL + "getPagesState",{adminData:adminData});
    }
    getSoloPagesStatesServer(adminData:string){
        return this.http.post<{
            registerChampionshipType:boolean,
            registerFreeAdsType:boolean,
            registerReportHackerType:boolean,
            appearHackerAndWinnersPubg:boolean,
            splitPlayersType:boolean
            existPaidAds:boolean,
            showAdsWillAppear:boolean,
            phonesAcceptPlayers:boolean}>(BACKEND_URL + "getPagesStateServer",{adminData:adminData});
    }
    setChampionshipTypetrue(adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "setChampionshipTypeTrue",{adminData:adminData});
    }
    setFreeAdsTypeTrue(adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "setFreeAdsTypeTrue",{adminData:adminData});
    }
    setReportHackerTypeTrue(adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "setReportHackerTypeTrue",{adminData:adminData});
    }
    setAppearHackerAndWinnersTrue(adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "setAppearHackerAndWinnersTrue",{adminData:adminData});
    }
    setSplitPlayersTypeTrue(adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "setSplitPlayersTypeTrue",{adminData:adminData});
    }
    setExistPaidAdsTrue(adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "setExistPaidAdsTrue",{adminData:adminData});
    }
    setShowAdsWillAppearTrue(adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "setShowAdsWillAppearTrue",{adminData:adminData});
    }
    setPhonesAcceptPlayersTrue(adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "setPhonesAcceptPlayersTrue",{adminData:adminData});
    }
    setChampionshipTypeFalse(adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "setChampionshipTypeFalse",{adminData:adminData});
    }
    setFreeAdsTypeFalse(adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "setFreeAdsTypeFalse",{adminData:adminData});
    }
    setReportHackerTypeFalse(adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "setReportHackerTypeFalse",{adminData:adminData});
    }
    setAppearHackerAndWinnersFalse(adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "setAppearHackerAndWinnersFalse",{adminData:adminData});
    }
    setSplitPlayersTypeFalse(adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "setSplitPlayersTypeFalse",{adminData:adminData});
    }
    setExistPaidAdsFalse(adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "setExistPaidAdsFalse",{adminData:adminData});
    }
    setShowAdsWillAppearFalse(adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "setShowAdsWillAppearFalse",{adminData:adminData});
    }
    setPhonesAcceptPlayersFalse(adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "setPhonesAcceptPlayersFalse",{adminData:adminData});
    }
    getAddPagesStates(adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "getAddPagesStates",{adminData:adminData});
    }
    getRegisterAds(adminData:string){
        return this.http.post<Array<{videoId:string, email:string, adAppearanceCountry:string}>>(BACKEND_URL + "getRegisterAds",{adminData:adminData})
    }
    getAdsWillAppear(numberAds:number,adminData:string){
        return this.http.post<Array<object>>(BACKEND_URL + "getAdsWillAppear",{adsnumber:numberAds,adminData:adminData})
    }
    addAdsWillAppear(ads:Array<object>,adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "addAdsWillAppear",{ads:ads,adminData:adminData})
    }
    addFreeAd(videoId:string ,email:string ,adCountry:string,adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "addFreeAd" , {videoId:videoId ,email:email ,adCountry:adCountry,adminData:adminData});
    }
    getRealAdsWillAppear(adminData:string){
        return this.http.post<Array<object>>(BACKEND_URL + "getRealAdsWillAppear",{adminData:adminData})
    }
    getRealAdsWillAppearServer(adminData:string){
        return this.http.post<{ads:object}>(BACKEND_URL + "getAdsWillAppearserver",{adminData:adminData})
    }
    deleteAdsWillAppear(adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "deleteAdsWillAppear",{adminData:adminData})
    }
    deleteFreeAd(deleteFreeAd:string,adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "deleteFreeAd" , {deleteFreeAd:deleteFreeAd,adminData:adminData});
    }
    adsFromDatabaseToServer(adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "adsFromDatabaseToServer",{adminData:adminData})
    }
    addPlayer(pubgId:string , email:string,adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "addPlayer" , {pubgId:pubgId , email:email,adminData:adminData})
    }
    deletePlayer(pubgId:string,adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "deletePlayer",{pubgId:pubgId,adminData:adminData})
    }
    getIdsPubg(adminData:string){
        return this.http.post<Array<{pubgId:string}>>(BACKEND_URL + "getPubgIds",{adminData:adminData});
    }
    addSplitPlayers(data:Array<object>,adminData:string){
        return this.http.post<{finish:boolean}>(BACKEND_URL + "splitPlayers" , {data:data,adminData:adminData});
    }
    deleteTempSplitPlayersLR(adminData:string){
        return this.http.post<{finish:boolean}>(BACKEND_URL + "deleteTempSplitPlayersLR",{adminData:adminData});
    }
    getLastWinnersRound(adminData:string){
        return this.http.post<Array<{pubgId:string}>>(BACKEND_URL + "getLastWinnersRound",{adminData:adminData});
    }
    getSplitPlayer(adminData:string){
        return this.http.post<Array<object>>(BACKEND_URL + "getSplitPlayer",{adminData:adminData});
    }
    addTempSplitPlayer(splitPlayers:Array<object>,adminData:string){
        return this.http.post<{finish:boolean}>(BACKEND_URL + "addTempSplitPlayer" , {splitPlayers:splitPlayers,adminData:adminData});
    }
    getSplitPlayerDate(date:string,adminData:string){
        return this.http.post<Array<object>>(BACKEND_URL + "getSplitPlayerDate" , {date:date,adminData:adminData});
    }
    getRegisterHackers(adminData:string){
        return this.http.post<Array<object>>(BACKEND_URL + "getRegisterHackers",{adminData:adminData});
    }
    getEmailHacker(idPubg:string,adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "getEmailHacker" , {idPubg:idPubg,adminData:adminData});
    }
    addHackers(hackers:Array<object>,adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "addHackers" , {hackers:hackers,adminData:adminData});
    }
    deleteWinner(id:string,adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "deleteWinner" , {id:id,adminData:adminData});
    }
    addWinners(winners:Array<object>,adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "addWinners" , {winners:winners,adminData:adminData});
    }
    getLastHackersRound(adminData:string){
        return this.http.post<Array<object>>(BACKEND_URL + "getLastHackersRound",{adminData:adminData});        
    }
    deleteReportHacker(id:string,adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "deleteReportHacker" , {id:id,adminData:adminData});
    }
    getLastHackersAndWinnersRound(adminData:string){
        return this.http.post<Array<object>>(BACKEND_URL + "getLastHackersAndWinnersRound",{adminData:adminData});        
    }
    addTempHackersAndWinners(HackersAndWinnersData:Array<object>,adminData:string){
        return this.http.post<{finish:boolean}>(BACKEND_URL + "addTempHackersAndWinners" , {HackersAndWinnersData:HackersAndWinnersData,adminData:adminData});
    }
    getLastHackersAndWinnersTempRound(adminData:string){
        return this.http.post<Array<object>>(BACKEND_URL + "getLastHackersAndWinnersTempRound",{adminData:adminData});        
    }
    addHackersAndWinners(HackersAndWinners:Array<object>,adminData:string){
        return this.http.post<{finish:boolean}>(BACKEND_URL + "addHackersAndWinners" , {HackersAndWinners:HackersAndWinners,adminData:adminData});
    }
    deleteTempHackersAndWinnersLR(adminData:string){
        return this.http.post<{finish:boolean}>(BACKEND_URL + "deleteTempHackersAndWinnersLR",{adminData:adminData});
    }
    getAllTempHackers(adminData:string){
        return this.http.post<Array<object>>(BACKEND_URL + "getAllTempHackers",{adminData:adminData});        
    }
    getAllHackers(adminData:string){
        return this.http.post<Array<object>>(BACKEND_URL + "getAllHackers",{adminData:adminData});  
    }
    addSubBlackList(data:Array<object>,adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "addSubBlackList" , {data:data,adminData:adminData});
    }
    addPhonesNumbers(phones:Array<object>,adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "addPhones" , {phones:phones,adminData:adminData});
    }
    getAllPhonesNumbers(adminData:string){
        return this.http.post<Array<object>>(BACKEND_URL + "getAllPhonesNumbers",{adminData:adminData});
    }
    getPhoneNumberPhones(PhoneNumber:string,adminData:string){
        return this.http.post<{message:string , phone:string}>(BACKEND_URL + "getPhoneNumberPhones",{PhoneNumber:PhoneNumber,adminData:adminData});
    }
    getPhoneNumberRegister(PhoneNumber:string,adminData:string){
        return this.http.post<{message:string , email:string , pubgId:string , phone:string , displayedAd:string}>(BACKEND_URL + "getPhoneNumberRegister",{PhoneNumber:PhoneNumber,adminData:adminData});
    }
    getRegisterPlayersData(adminData:string){
        return this.http.post<Array<{email:string , pubgId:string , phone:string , displayedAd:string}>>(BACKEND_URL + "getRegisterPlayersData",{adminData:adminData});
    }
    deletePhoneNumber(PhoneNumber:string,adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "deletePhoneNumber",{PhoneNumber:PhoneNumber,adminData:adminData});
    }
    deleteAllPhonesNumbers(adminData:string){
        return this.http.post<{finish:boolean}>(BACKEND_URL + "deleteAllPhonesNumbers",{adminData:adminData})
    }
    getSpecificRamadan(date:string , time:number ,adminData:string){
        return this.http.post<Array<{round:number,groupNumber:number,groupPlayers:Array<object>, date:string , time:number}>>(BACKEND_URL + "getSpecificRamadan",{date:date , time:time ,adminData:adminData})
    }
    addSpecificRamadan(groupsRamadan:Array<object> ,adminData:string){
        return this.http.post<string>(BACKEND_URL + "addSpecificRamadan",{groupsRamadan:groupsRamadan ,adminData:adminData})
    }
    deleteSpecificRamadan(date:string , time:number ,adminData:string){
        return this.http.post<string>(BACKEND_URL + "deleteSpecificRamadan",{date:date , time:time ,adminData:adminData})
    }
    getTimeSpecificRamadan(time:number ,adminData:string){
        return this.http.post<Array<object>>(BACKEND_URL + "getTimeSpecificRamadan",{time:time ,adminData:adminData})
    }
    getAllPlayersData(adminData:string){
        return this.http.post<object>(BACKEND_URL + "getAllPlayersData",{adminData:adminData})
    }
    addTotalPlayersServer(numberRegister:number,adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "addTotalPlayersServer" , {numberRegister:numberRegister,adminData:adminData});
    }
    addPlayersTest(adminData:string){
        return this.http.post<{message:string}>(BACKEND_URL + "addPlayersForTest" , {adminData:adminData});
    }
}