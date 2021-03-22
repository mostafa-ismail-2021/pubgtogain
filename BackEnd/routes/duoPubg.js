const express = require('express');
const duoPubgRouters = express.Router();
const checkAuth = require('../middleware/check-auth');
const duoPubgController = require("../controllers/duoPubg");

duoPubgRouters.post('/increaseVideoId',duoPubgController.increaseVideoId);

duoPubgRouters.post("/tLRegisterGetAd", duoPubgController.tLRegisterGetAd);

duoPubgRouters.post("/checkPerson",duoPubgController.checkPerson);

duoPubgRouters.post("/tLSendData",duoPubgController.tLSendData);

duoPubgRouters.post("/memberReGetAd", duoPubgController.memberReGetAd);

duoPubgRouters.post("/sendMemberEmailConfirm",duoPubgController.sendMemberEmailConfirm);

duoPubgRouters.post("/mSendData",duoPubgController.mSendData);

duoPubgRouters.post("/dateGetAd", duoPubgController.dateGetAd);

duoPubgRouters.post("/getPlayerDate",duoPubgController.getPlayerDate);

duoPubgRouters.post("/freeAdGetAd", duoPubgController.freeAdGetAd)

duoPubgRouters.post("/checkPersonFreeAd", duoPubgController.checkPersonFreeAd)

duoPubgRouters.post("/sendDataFreeAd",duoPubgController.sendDataFreeAd);

duoPubgRouters.post("/reportHackerRegister", duoPubgController.reportHackerRegister);

duoPubgRouters.post("/checkPersonHacker",duoPubgController.checkPersonHacker)

duoPubgRouters.post("/sendDataHacker",duoPubgController.sendDataHacker);  

duoPubgRouters.post("/getPlayerState", duoPubgController.getPlayerState);

duoPubgRouters.post("/addChampion" ,checkAuth, duoPubgController.addChampion);

duoPubgRouters.post("/deleteChampionShips" ,checkAuth, duoPubgController.deleteChampionShips);

duoPubgRouters.post("/deleteEmails" ,checkAuth, duoPubgController.deleteEmails);

duoPubgRouters.post("/deleteHackersAndWinners" ,checkAuth, duoPubgController.deleteHackersAndWinners);

duoPubgRouters.post("/deleteRegisterFreeAds" ,checkAuth, duoPubgController.deleteRegisterFreeAds);

duoPubgRouters.post("/deleteRegisterHackers" ,checkAuth, duoPubgController.deleteRegisterHackers);

duoPubgRouters.post("/getLastSplitPlayersTempRound" ,checkAuth, duoPubgController.getLastSplitPlayersTempRound);

duoPubgRouters.post("/deleteRegisterPlayers" ,checkAuth, duoPubgController.deleteRegisterPlayers);

duoPubgRouters.post("/deleteSplitePlayers" ,checkAuth, duoPubgController.deleteSplitePlayers);

duoPubgRouters.post("/deleteTempHackersAndWinners" ,checkAuth, duoPubgController.deleteTempHackersAndWinners);

duoPubgRouters.post("/deleteTempSplitePlayers" ,checkAuth, duoPubgController.deleteTempSplitePlayers);

duoPubgRouters.post("/setAllServerRefFalse" ,checkAuth, duoPubgController.setAllServerRefFalse);

duoPubgRouters.post("/getCharityAdsTable" ,checkAuth, duoPubgController.getCharityAdsTable);

duoPubgRouters.post("/addCharityAds" ,checkAuth, duoPubgController.addCharityAds);

duoPubgRouters.post("/getCharityAds" ,checkAuth, duoPubgController.getCharityAds);

duoPubgRouters.post("/getCharityAdsServer" ,checkAuth, duoPubgController.getCharityAdsServer);

duoPubgRouters.post("/deleteCharityAds" ,checkAuth, duoPubgController.deleteCharityAds);

duoPubgRouters.post("/getPaidAds" ,checkAuth, duoPubgController.getPaidAds);

duoPubgRouters.post("/addPaidAds" ,checkAuth, duoPubgController.addPaidAds);

duoPubgRouters.post("/getNumberPaidAds" ,checkAuth, duoPubgController.getNumberPaidAds);

duoPubgRouters.post("/addPaidAd" ,checkAuth, duoPubgController.addPaidAd);

duoPubgRouters.post("/getDuoPaidAds" ,checkAuth, duoPubgController.getDuoPaidAds);

duoPubgRouters.post("/deletePaidAds" ,checkAuth, duoPubgController.deletePaidAds);

duoPubgRouters.post("/deletePaidAd" ,checkAuth, duoPubgController.deletePaidAd);

duoPubgRouters.post("/getRandomAddBlackList" ,checkAuth, duoPubgController.getRandomAddBlackList);

duoPubgRouters.post("/getAllAddBlackList" ,checkAuth, duoPubgController.getAllAddBlackList);

duoPubgRouters.post("/getAllBlackList" ,checkAuth, duoPubgController.getAllBlackList);

duoPubgRouters.post("/deleteAllBlackList" ,checkAuth, duoPubgController.deleteAllBlackList);

duoPubgRouters.post("/getPagesState" ,checkAuth, duoPubgController.getPagesState);

duoPubgRouters.post("/getPagesStateServer" ,checkAuth, duoPubgController.getPagesStateServer);

duoPubgRouters.post("/setTeamLeaderTypeTrue" ,checkAuth, duoPubgController.setTeamLeaderTypeTrue);

duoPubgRouters.post("/setMemberTypeTrue" ,checkAuth, duoPubgController.setMemberTypeTrue);

duoPubgRouters.post("/setFreeAdsTypeTrue" ,checkAuth, duoPubgController.setFreeAdsTypeTrue);

duoPubgRouters.post("/setReportHackerTypeTrue" ,checkAuth, duoPubgController.setReportHackerTypeTrue);

duoPubgRouters.post("/setAppearHackerAndWinnersTrue" ,checkAuth, duoPubgController.setAppearHackerAndWinnersTrue);

duoPubgRouters.post("/setSplitPlayersTypeTrue" ,checkAuth, duoPubgController.setSplitPlayersTypeTrue);

duoPubgRouters.post("/setExistPaidAdsTrue" ,checkAuth, duoPubgController.setExistPaidAdsTrue);

duoPubgRouters.post("/setShowAdsWillAppearTrue" ,checkAuth, duoPubgController.setShowAdsWillAppearTrue);

duoPubgRouters.post("/setPhonesAcceptPlayersTrue" ,checkAuth, duoPubgController.setPhonesAcceptPlayersTrue);

duoPubgRouters.post("/setTeamLeaderTypeFalse" ,checkAuth, duoPubgController.setTeamLeaderTypeFalse);

duoPubgRouters.post("/setMemberTypeFalse" ,checkAuth, duoPubgController.setMemberTypeFalse);

duoPubgRouters.post("/setFreeAdsTypeFalse" ,checkAuth, duoPubgController.setFreeAdsTypeFalse);

duoPubgRouters.post("/setReportHackerTypeFalse" ,checkAuth, duoPubgController.setReportHackerTypeFalse);

duoPubgRouters.post("/setAppearHackerAndWinnersFalse" ,checkAuth, duoPubgController.setAppearHackerAndWinnersFalse);

duoPubgRouters.post("/setSplitPlayersTypeFalse" ,checkAuth, duoPubgController.setSplitPlayersTypeFalse);

duoPubgRouters.post("/setExistPaidAdsFalse" ,checkAuth, duoPubgController.setExistPaidAdsFalse);

duoPubgRouters.post("/setShowAdsWillAppearFalse" ,checkAuth, duoPubgController.setShowAdsWillAppearFalse);

duoPubgRouters.post("/setPhonesAcceptPlayersFalse" ,checkAuth, duoPubgController.setPhonesAcceptPlayersFalse);

duoPubgRouters.post("/getAddPagesStates" ,checkAuth, duoPubgController.getAddPagesStates);

duoPubgRouters.post("/getRegisterAds" ,checkAuth, duoPubgController.getRegisterAds);

duoPubgRouters.post("/getAdsWillAppear" ,checkAuth, duoPubgController.getAdsWillAppear);

duoPubgRouters.post("/addAdsWillAppear" ,checkAuth, duoPubgController.addAdsWillAppear);

duoPubgRouters.post("/addFreeAd" ,checkAuth, duoPubgController.addFreeAd);

duoPubgRouters.post("/getRealAdsWillAppear" ,checkAuth, duoPubgController.getRealAdsWillAppear);

duoPubgRouters.post("/getAdsWillAppearserver" ,checkAuth, duoPubgController.getAdsWillAppearserver);

duoPubgRouters.post("/deleteAdsWillAppear" ,checkAuth, duoPubgController.deleteAdsWillAppear);

duoPubgRouters.post("/deleteFreeAd" ,checkAuth, duoPubgController.deleteFreeAd);

duoPubgRouters.post("/adsFromDatabaseToServer" ,checkAuth, duoPubgController.adsFromDatabaseToServer);

duoPubgRouters.post("/addPlayer" ,checkAuth, duoPubgController.addPlayer);

duoPubgRouters.post("/deletePlayer" ,checkAuth, duoPubgController.deletePlayer);

duoPubgRouters.post("/getPubgIds" ,checkAuth, duoPubgController.getPubgIds);

duoPubgRouters.post("/getIdsPubgRegister" ,checkAuth, duoPubgController.getIdsPubgRegister);

duoPubgRouters.post("/splitPlayers" ,checkAuth, duoPubgController.splitPlayers);

duoPubgRouters.post("/deleteTempSplitPlayersLR" ,checkAuth, duoPubgController.deleteTempSplitPlayersLR);

duoPubgRouters.post("/getLastWinnersRound" ,checkAuth, duoPubgController.getLastWinnersRound);

duoPubgRouters.post("/getSplitPlayer" ,checkAuth, duoPubgController.getSplitPlayer);

duoPubgRouters.post("/addTempSplitPlayer" ,checkAuth, duoPubgController.addTempSplitPlayer);

duoPubgRouters.post("/getSplitPlayerDate" ,checkAuth, duoPubgController.getSplitPlayerDate);

duoPubgRouters.post("/getRegisterHackers" ,checkAuth, duoPubgController.getRegisterHackers);

duoPubgRouters.post("/getDataDebendId" ,checkAuth, duoPubgController.getDataDebendId);

duoPubgRouters.post("/addHackers" ,checkAuth, duoPubgController.addHackers);

duoPubgRouters.post("/getLastHackersRound" ,checkAuth, duoPubgController.getLastHackersRound);

duoPubgRouters.post("/deleteReportHacker" ,checkAuth, duoPubgController.deleteReportHacker);

duoPubgRouters.post("/addWinners" ,checkAuth, duoPubgController.addWinners);

duoPubgRouters.post("/deleteWinner" ,checkAuth, duoPubgController.deleteWinner);

duoPubgRouters.post("/getLastHackersAndWinnersRound" ,checkAuth, duoPubgController.getLastHackersAndWinnersRound);

duoPubgRouters.post("/addTempHackersAndWinners" ,checkAuth, duoPubgController.addTempHackersAndWinners);

duoPubgRouters.post("/getLastHackersAndWinnersTempRound" ,checkAuth, duoPubgController.getLastHackersAndWinnersTempRound);

duoPubgRouters.post("/addHackersAndWinners" ,checkAuth, duoPubgController.addHackersAndWinners);

duoPubgRouters.post("/deleteTempHackersAndWinnersLR" ,checkAuth, duoPubgController.deleteTempHackersAndWinnersLR);

duoPubgRouters.post("/getAllTempHackers" ,checkAuth, duoPubgController.getAllTempHackers);

duoPubgRouters.post("/getAllHackers" ,checkAuth, duoPubgController.getAllHackers);

duoPubgRouters.post("/addSubBlackList" ,checkAuth, duoPubgController.addSubBlackList);

duoPubgRouters.post("/addPhones" ,checkAuth, duoPubgController.addPhones);

duoPubgRouters.post("/getAllPhonesNumbers" ,checkAuth, duoPubgController.getAllPhonesNumbers);

duoPubgRouters.post("/getPhoneNumberPhones" ,checkAuth, duoPubgController.getPhoneNumberPhones);

duoPubgRouters.post("/getPhoneNumberRegister" ,checkAuth, duoPubgController.getPhoneNumberRegister);

duoPubgRouters.post("/getRegisterPlayersData" ,checkAuth, duoPubgController.getRegisterPlayersData);

duoPubgRouters.post("/deletePhoneNumber" ,checkAuth, duoPubgController.deletePhoneNumber);

duoPubgRouters.post("/deleteAllPhonesNumbers" ,checkAuth, duoPubgController.deleteAllPhonesNumbers);

duoPubgRouters.post("/getSpecificRamadan" ,checkAuth, duoPubgController.getSpecificRamadan);

duoPubgRouters.post("/addSpecificRamadan" ,checkAuth, duoPubgController.addSpecificRamadan);

duoPubgRouters.post("/deleteSpecificRamadan" ,checkAuth, duoPubgController.deleteSpecificRamadan);

duoPubgRouters.post("/getTimeSpecificRamadan" ,checkAuth, duoPubgController.getTimeSpecificRamadan);

duoPubgRouters.post("/getAllPlayersData" ,checkAuth, duoPubgController.getAllPlayersData);

duoPubgRouters.post("/addTotalPlayersServer" ,checkAuth, duoPubgController.addTotalPlayersServer);
/*test*/
duoPubgRouters.post("/addPlayersForTest" , duoPubgController.addPlayersForTest);

module.exports = duoPubgRouters;