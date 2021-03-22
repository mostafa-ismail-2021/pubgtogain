const express = require('express');
const squadPubgRouters = express.Router();
const checkAuth = require('../middleware/check-auth');
const squadPubgController = require("../controllers/squadPubg");

squadPubgRouters.post('/increaseVideoId', squadPubgController.increaseVideoId);

squadPubgRouters.post("/tLRegisterGetAd", squadPubgController.tLRegisterGetAd);

squadPubgRouters.post("/checkPerson", squadPubgController.checkPerson);

squadPubgRouters.post("/tLSendData", squadPubgController.tLSendData);

squadPubgRouters.post("/memberReGetAd", squadPubgController.memberReGetAd);

squadPubgRouters.post("/sendMemberEmailConfirm", squadPubgController.sendMemberEmailConfirm);

squadPubgRouters.post("/mSendData", squadPubgController.mSendData);

squadPubgRouters.post("/dateGetAd", squadPubgController.dateGetAd);
  
squadPubgRouters.post("/getPlayerDate", squadPubgController.getPlayerDate);

squadPubgRouters.post("/freeAdGetAd", squadPubgController.freeAdGetAd);
  
squadPubgRouters.post("/checkPersonFreeAd", squadPubgController.checkPersonFreeAd);

squadPubgRouters.post("/sendDataFreeAd", squadPubgController.sendDataFreeAd);
  
squadPubgRouters.post("/reportHackerRegister", squadPubgController.reportHackerRegister);

squadPubgRouters.post("/checkPersonHacker", squadPubgController.checkPersonHacker)
  
squadPubgRouters.post("/sendDataHacker", squadPubgController.sendDataHacker);  

squadPubgRouters.post("/getPlayerState", squadPubgController.getPlayerState);  

squadPubgRouters.post("/addChampion" ,checkAuth, squadPubgController.addChampion);

squadPubgRouters.post("/deleteChampionShips" ,checkAuth, squadPubgController.deleteChampionShips);

squadPubgRouters.post("/deleteEmails" ,checkAuth, squadPubgController.deleteEmails);

squadPubgRouters.post("/deleteHackersAndWinners" ,checkAuth, squadPubgController.deleteHackersAndWinners);

squadPubgRouters.post("/deleteRegisterFreeAds" ,checkAuth, squadPubgController.deleteRegisterFreeAds);

squadPubgRouters.post("/deleteRegisterHackers" ,checkAuth, squadPubgController.deleteRegisterHackers);

squadPubgRouters.post("/getLastSplitPlayersTempRound" ,checkAuth, squadPubgController.getLastSplitPlayersTempRound);

squadPubgRouters.post("/deleteRegisterPlayers" ,checkAuth, squadPubgController.deleteRegisterPlayers);

squadPubgRouters.post("/deleteSplitePlayers" ,checkAuth, squadPubgController.deleteSplitePlayers);

squadPubgRouters.post("/deleteTempHackersAndWinners" ,checkAuth, squadPubgController.deleteTempHackersAndWinners);

squadPubgRouters.post("/deleteTempSplitePlayers" ,checkAuth, squadPubgController.deleteTempSplitePlayers);

squadPubgRouters.post("/setAllServerRefFalse" ,checkAuth, squadPubgController.setAllServerRefFalse);

squadPubgRouters.post("/getCharityAdsTable" ,checkAuth, squadPubgController.getCharityAdsTable);

squadPubgRouters.post("/addCharityAds" ,checkAuth, squadPubgController.addCharityAds);

squadPubgRouters.post("/getCharityAds" ,checkAuth, squadPubgController.getCharityAds);

squadPubgRouters.post("/getCharityAdsServer" ,checkAuth, squadPubgController.getCharityAdsServer);

squadPubgRouters.post("/deleteCharityAds" ,checkAuth, squadPubgController.deleteCharityAds);

squadPubgRouters.post("/getPaidAds" ,checkAuth, squadPubgController.getPaidAds);

squadPubgRouters.post("/addPaidAds" ,checkAuth, squadPubgController.addPaidAds);

squadPubgRouters.post("/getNumberPaidAds" ,checkAuth, squadPubgController.getNumberPaidAds);

squadPubgRouters.post("/addPaidAd" ,checkAuth, squadPubgController.addPaidAd);

squadPubgRouters.post("/getSquadPaidAds" ,checkAuth, squadPubgController.getSquadPaidAds);

squadPubgRouters.post("/deletePaidAds" ,checkAuth, squadPubgController.deletePaidAds);

squadPubgRouters.post("/deletePaidAd" ,checkAuth, squadPubgController.deletePaidAd);

squadPubgRouters.post("/getRandomAddBlackList" ,checkAuth, squadPubgController.getRandomAddBlackList);

squadPubgRouters.post("/getAllAddBlackList" ,checkAuth, squadPubgController.getAllAddBlackList);

squadPubgRouters.post("/getAllBlackList" ,checkAuth, squadPubgController.getAllBlackList);

squadPubgRouters.post("/deleteAllBlackList" ,checkAuth, squadPubgController.deleteAllBlackList);

squadPubgRouters.post("/getPagesState" ,checkAuth, squadPubgController.getPagesState);

squadPubgRouters.post("/getPagesStateServer" ,checkAuth, squadPubgController.getPagesStateServer);

squadPubgRouters.post("/setTeamLeaderTypeTrue" ,checkAuth, squadPubgController.setTeamLeaderTypeTrue);

squadPubgRouters.post("/setMemberTypeTrue" ,checkAuth, squadPubgController.setMemberTypeTrue);

squadPubgRouters.post("/setFreeAdsTypeTrue" ,checkAuth, squadPubgController.setFreeAdsTypeTrue);

squadPubgRouters.post("/setReportHackerTypeTrue" ,checkAuth, squadPubgController.setReportHackerTypeTrue);

squadPubgRouters.post("/setAppearHackerAndWinnersTrue" ,checkAuth, squadPubgController.setAppearHackerAndWinnersTrue);

squadPubgRouters.post("/setSplitPlayersTypeTrue" ,checkAuth, squadPubgController.setSplitPlayersTypeTrue);

squadPubgRouters.post("/setExistPaidAdsTrue" ,checkAuth, squadPubgController.setExistPaidAdsTrue);

squadPubgRouters.post("/setShowAdsWillAppearTrue" ,checkAuth, squadPubgController.setShowAdsWillAppearTrue);

squadPubgRouters.post("/setPhonesAcceptPlayersTrue" ,checkAuth, squadPubgController.setPhonesAcceptPlayersTrue);

squadPubgRouters.post("/setTeamLeaderTypeFalse" ,checkAuth, squadPubgController.setTeamLeaderTypeFalse);

squadPubgRouters.post("/setMemberTypeFalse" ,checkAuth, squadPubgController.setMemberTypeFalse);

squadPubgRouters.post("/setFreeAdsTypeFalse" ,checkAuth, squadPubgController.setFreeAdsTypeFalse);

squadPubgRouters.post("/setReportHackerTypeFalse" ,checkAuth, squadPubgController.setReportHackerTypeFalse);

squadPubgRouters.post("/setAppearHackerAndWinnersFalse" ,checkAuth, squadPubgController.setAppearHackerAndWinnersFalse);

squadPubgRouters.post("/setSplitPlayersTypeFalse" ,checkAuth, squadPubgController.setSplitPlayersTypeFalse);

squadPubgRouters.post("/setExistPaidAdsFalse" ,checkAuth, squadPubgController.setExistPaidAdsFalse);

squadPubgRouters.post("/setShowAdsWillAppearFalse" ,checkAuth, squadPubgController.setShowAdsWillAppearFalse);

squadPubgRouters.post("/setPhonesAcceptPlayersFalse" ,checkAuth, squadPubgController.setPhonesAcceptPlayersFalse);

squadPubgRouters.post("/getAddPagesStates" ,checkAuth, squadPubgController.getAddPagesStates);

squadPubgRouters.post("/getRegisterAds" ,checkAuth, squadPubgController.getRegisterAds);

squadPubgRouters.post("/getAdsWillAppear" ,checkAuth, squadPubgController.getAdsWillAppear);

squadPubgRouters.post("/addAdsWillAppear" ,checkAuth, squadPubgController.addAdsWillAppear);

squadPubgRouters.post("/addFreeAd" ,checkAuth, squadPubgController.addFreeAd);

squadPubgRouters.post("/getRealAdsWillAppear" ,checkAuth, squadPubgController.getRealAdsWillAppear);

squadPubgRouters.post("/getAdsWillAppearserver" ,checkAuth, squadPubgController.getAdsWillAppearserver);

squadPubgRouters.post("/deleteAdsWillAppear" ,checkAuth, squadPubgController.deleteAdsWillAppear);

squadPubgRouters.post("/deleteFreeAd" ,checkAuth, squadPubgController.deleteFreeAd);

squadPubgRouters.post("/adsFromDatabaseToServer" ,checkAuth, squadPubgController.adsFromDatabaseToServer);

squadPubgRouters.post("/addPlayer" ,checkAuth, squadPubgController.addPlayer);

squadPubgRouters.post("/deletePlayer" ,checkAuth, squadPubgController.deletePlayer);

squadPubgRouters.post("/getPubgIds" ,checkAuth, squadPubgController.getPubgIds);

squadPubgRouters.post("/getIdsPubgRegister" ,checkAuth, squadPubgController.getIdsPubgRegister);

squadPubgRouters.post("/splitPlayers" ,checkAuth, squadPubgController.splitPlayers);

squadPubgRouters.post("/deleteTempSplitPlayersLR" ,checkAuth, squadPubgController.deleteTempSplitPlayersLR);

squadPubgRouters.post("/getLastWinnersRound" ,checkAuth, squadPubgController.getLastWinnersRound);

squadPubgRouters.post("/getSplitPlayer" ,checkAuth, squadPubgController.getSplitPlayer);

squadPubgRouters.post("/addTempSplitPlayer" ,checkAuth, squadPubgController.addTempSplitPlayer);

squadPubgRouters.post("/getSplitPlayerDate" ,checkAuth, squadPubgController.getSplitPlayerDate);

squadPubgRouters.post("/getRegisterHackers" ,checkAuth, squadPubgController.getRegisterHackers);

squadPubgRouters.post("/getDataDebendId" ,checkAuth, squadPubgController.getDataDebendId);

squadPubgRouters.post("/addHackers" ,checkAuth, squadPubgController.addHackers);

squadPubgRouters.post("/getLastHackersRound" ,checkAuth, squadPubgController.getLastHackersRound);

squadPubgRouters.post("/deleteReportHacker" ,checkAuth, squadPubgController.deleteReportHacker);

squadPubgRouters.post("/addWinners" ,checkAuth, squadPubgController.addWinners);

squadPubgRouters.post("/deleteWinner" ,checkAuth, squadPubgController.deleteWinner);

squadPubgRouters.post("/getLastHackersAndWinnersRound" ,checkAuth, squadPubgController.getLastHackersAndWinnersRound);

squadPubgRouters.post("/addTempHackersAndWinners" ,checkAuth, squadPubgController.addTempHackersAndWinners);

squadPubgRouters.post("/getLastHackersAndWinnersTempRound" ,checkAuth, squadPubgController.getLastHackersAndWinnersTempRound);

squadPubgRouters.post("/addHackersAndWinners" ,checkAuth, squadPubgController.addHackersAndWinners);

squadPubgRouters.post("/deleteTempHackersAndWinnersLR" ,checkAuth, squadPubgController.deleteTempHackersAndWinnersLR);

squadPubgRouters.post("/getAllTempHackers" ,checkAuth, squadPubgController.getAllTempHackers);

squadPubgRouters.post("/getAllHackers" ,checkAuth, squadPubgController.getAllHackers);

squadPubgRouters.post("/addSubBlackList" ,checkAuth, squadPubgController.addSubBlackList);

squadPubgRouters.post("/addPhones" ,checkAuth, squadPubgController.addPhones);

squadPubgRouters.post("/getAllPhonesNumbers" ,checkAuth, squadPubgController.getAllPhonesNumbers);

squadPubgRouters.post("/getPhoneNumberPhones" ,checkAuth, squadPubgController.getPhoneNumberPhones);

squadPubgRouters.post("/getPhoneNumberRegister" ,checkAuth, squadPubgController.getPhoneNumberRegister);

squadPubgRouters.post("/getRegisterPlayersData" ,checkAuth, squadPubgController.getRegisterPlayersData);

squadPubgRouters.post("/deletePhoneNumber" ,checkAuth, squadPubgController.deletePhoneNumber);

squadPubgRouters.post("/deleteAllPhonesNumbers" ,checkAuth, squadPubgController.deleteAllPhonesNumbers);

squadPubgRouters.post("/getSpecificRamadan" ,checkAuth, squadPubgController.getSpecificRamadan);

squadPubgRouters.post("/addSpecificRamadan" ,checkAuth, squadPubgController.addSpecificRamadan);

squadPubgRouters.post("/deleteSpecificRamadan" ,checkAuth, squadPubgController.deleteSpecificRamadan);

squadPubgRouters.post("/getTimeSpecificRamadan" ,checkAuth, squadPubgController.getTimeSpecificRamadan);

squadPubgRouters.post("/getAllPlayersData" ,checkAuth, squadPubgController.getAllPlayersData);

squadPubgRouters.post("/addTotalPlayersServer" ,checkAuth, squadPubgController.addTotalPlayersServer);

/*test*/
squadPubgRouters.post("/addPlayersForTest" , squadPubgController.addPlayersForTest);

module.exports = squadPubgRouters;