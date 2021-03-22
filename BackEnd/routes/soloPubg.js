const express = require('express');
const soloPubgRouters = express.Router();
const checkAuth = require('../middleware/check-auth');
const soloPubgController = require("../controllers/soloPubg");

soloPubgRouters.post('/increaseVideo', soloPubgController.increaseVideo);

soloPubgRouters.post("/registerGetAd", soloPubgController.registerGetAd);
  
soloPubgRouters.post("/checkPerson", soloPubgController.checkPerson);
  
soloPubgRouters.post("/sendData", soloPubgController.sendData);

soloPubgRouters.post("/dateGetAd", soloPubgController.dateGetAd);
  
soloPubgRouters.post("/getPlayerDate", soloPubgController.getPlayerDate);
 
soloPubgRouters.post("/freeAdGetAd", soloPubgController.freeAdGetAd)
 
soloPubgRouters.post("/checkPersonFreeAd", soloPubgController.checkPersonFreeAd)

soloPubgRouters.post("/sendDataFreeAd", soloPubgController.sendDataFreeAd);
  
soloPubgRouters.post("/reportHackerRegister", soloPubgController.reportHackerRegister);

soloPubgRouters.post("/checkPersonHacker", soloPubgController.checkPersonHacker)
  
soloPubgRouters.post("/sendDataHacker", soloPubgController.sendDataHacker);

soloPubgRouters.post("/getPlayerState", soloPubgController.getPlayerState);

soloPubgRouters.post("/addChampion" ,checkAuth, soloPubgController.addChampion);

soloPubgRouters.post("/deleteChampionShips" ,checkAuth, soloPubgController.deleteChampionShips);

soloPubgRouters.post("/deleteEmails" ,checkAuth, soloPubgController.deleteEmails);

soloPubgRouters.post("/deleteHackersAndWinners" ,checkAuth, soloPubgController.deleteHackersAndWinners);

soloPubgRouters.post("/deleteRegisterFreeAds" ,checkAuth, soloPubgController.deleteRegisterFreeAds);

soloPubgRouters.post("/deleteRegisterHackers" ,checkAuth, soloPubgController.deleteRegisterHackers);

soloPubgRouters.post("/getLastSplitPlayersTempRound" ,checkAuth, soloPubgController.getLastSplitPlayersTempRound);

soloPubgRouters.post("/deleteRegisterPlayers" ,checkAuth, soloPubgController.deleteRegisterPlayers);

soloPubgRouters.post("/deleteSplitePlayers" ,checkAuth, soloPubgController.deleteSplitePlayers);

soloPubgRouters.post("/deleteTempHackersAndWinners" ,checkAuth, soloPubgController.deleteTempHackersAndWinners);

soloPubgRouters.post("/deleteTempSplitePlayers" ,checkAuth, soloPubgController.deleteTempSplitePlayers);

soloPubgRouters.post("/setAllServerRefFalse" ,checkAuth, soloPubgController.setAllServerRefFalse);

soloPubgRouters.post("/getCharityAdsTable" ,checkAuth, soloPubgController.getCharityAdsTable);

soloPubgRouters.post("/addCharityAds" ,checkAuth, soloPubgController.addCharityAds);

soloPubgRouters.post("/getCharityAds" ,checkAuth, soloPubgController.getCharityAds);

soloPubgRouters.post("/getCharityAdsServer" ,checkAuth, soloPubgController.getCharityAdsServer);

soloPubgRouters.post("/deleteCharityAds" ,checkAuth, soloPubgController.deleteCharityAds);

soloPubgRouters.post("/getPaidAds" ,checkAuth, soloPubgController.getPaidAds);

soloPubgRouters.post("/addPaidAds" ,checkAuth, soloPubgController.addPaidAds);

soloPubgRouters.post("/getNumberPaidAds" ,checkAuth, soloPubgController.getNumberPaidAds);

soloPubgRouters.post("/addPaidAd" ,checkAuth, soloPubgController.addPaidAd);

soloPubgRouters.post("/getSoloPaidAds" ,checkAuth, soloPubgController.getSoloPaidAds);

soloPubgRouters.post("/deletePaidAds" ,checkAuth, soloPubgController.deletePaidAds);

soloPubgRouters.post("/deletePaidAd" ,checkAuth, soloPubgController.deletePaidAd);

soloPubgRouters.post("/getRandomAddBlackList" ,checkAuth, soloPubgController.getRandomAddBlackList);

soloPubgRouters.post("/getAllAddBlackList" ,checkAuth, soloPubgController.getAllAddBlackList);

soloPubgRouters.post("/getAllBlackList" ,checkAuth, soloPubgController.getAllBlackList);

soloPubgRouters.post("/deleteAllBlackList" ,checkAuth, soloPubgController.deleteAllBlackList);

soloPubgRouters.post("/getPagesState" ,checkAuth, soloPubgController.getPagesState);

soloPubgRouters.post("/getPagesStateServer" ,checkAuth, soloPubgController.getPagesStateServer);

soloPubgRouters.post("/setChampionshipTypeTrue" ,checkAuth, soloPubgController.setChampionshipTypeTrue);

soloPubgRouters.post("/setFreeAdsTypeTrue" ,checkAuth, soloPubgController.setFreeAdsTypeTrue);

soloPubgRouters.post("/setReportHackerTypeTrue" ,checkAuth, soloPubgController.setReportHackerTypeTrue);

soloPubgRouters.post("/setAppearHackerAndWinnersTrue" ,checkAuth, soloPubgController.setAppearHackerAndWinnersTrue);

soloPubgRouters.post("/setSplitPlayersTypeTrue" ,checkAuth, soloPubgController.setSplitPlayersTypeTrue);

soloPubgRouters.post("/setExistPaidAdsTrue" ,checkAuth, soloPubgController.setExistPaidAdsTrue);

soloPubgRouters.post("/setShowAdsWillAppearTrue" ,checkAuth, soloPubgController.setShowAdsWillAppearTrue);

soloPubgRouters.post("/setPhonesAcceptPlayersTrue" ,checkAuth, soloPubgController.setPhonesAcceptPlayersTrue);

soloPubgRouters.post("/setChampionshipTypeFalse" ,checkAuth, soloPubgController.setChampionshipTypeFalse);

soloPubgRouters.post("/setFreeAdsTypeFalse" ,checkAuth, soloPubgController.setFreeAdsTypeFalse);

soloPubgRouters.post("/setReportHackerTypeFalse" ,checkAuth, soloPubgController.setReportHackerTypeFalse);

soloPubgRouters.post("/setAppearHackerAndWinnersFalse" ,checkAuth, soloPubgController.setAppearHackerAndWinnersFalse);

soloPubgRouters.post("/setSplitPlayersTypeFalse" ,checkAuth, soloPubgController.setSplitPlayersTypeFalse);

soloPubgRouters.post("/setExistPaidAdsFalse" ,checkAuth, soloPubgController.setExistPaidAdsFalse);

soloPubgRouters.post("/setShowAdsWillAppearFalse" ,checkAuth, soloPubgController.setShowAdsWillAppearFalse);

soloPubgRouters.post("/setPhonesAcceptPlayersFalse" ,checkAuth, soloPubgController.setPhonesAcceptPlayersFalse);

soloPubgRouters.post("/getAddPagesStates" ,checkAuth, soloPubgController.getAddPagesStates);

soloPubgRouters.post("/getRegisterAds" ,checkAuth, soloPubgController.getRegisterAds);

soloPubgRouters.post("/getAdsWillAppear" ,checkAuth, soloPubgController.getAdsWillAppear);

soloPubgRouters.post("/addAdsWillAppear" ,checkAuth, soloPubgController.addAdsWillAppear);

soloPubgRouters.post("/addFreeAd" ,checkAuth, soloPubgController.addFreeAd);

soloPubgRouters.post("/getRealAdsWillAppear" ,checkAuth, soloPubgController.getRealAdsWillAppear);

soloPubgRouters.post("/getAdsWillAppearserver" ,checkAuth, soloPubgController.getAdsWillAppearserver);

soloPubgRouters.post("/deleteAdsWillAppear" ,checkAuth, soloPubgController.deleteAdsWillAppear);

soloPubgRouters.post("/deleteFreeAd" ,checkAuth, soloPubgController.deleteFreeAd);

soloPubgRouters.post("/adsFromDatabaseToServer" ,checkAuth, soloPubgController.adsFromDatabaseToServer);

soloPubgRouters.post("/addPlayer" ,checkAuth, soloPubgController.addPlayer);

soloPubgRouters.post("/deletePlayer" ,checkAuth, soloPubgController.deletePlayer);

soloPubgRouters.post("/getPubgIds" ,checkAuth, soloPubgController.getPubgIds);

soloPubgRouters.post("/splitPlayers" ,checkAuth, soloPubgController.splitPlayers);

soloPubgRouters.post("/deleteTempSplitPlayersLR" ,checkAuth, soloPubgController.deleteTempSplitPlayersLR);

soloPubgRouters.post("/getLastWinnersRound" ,checkAuth, soloPubgController.getLastWinnersRound);

soloPubgRouters.post("/getSplitPlayer" ,checkAuth, soloPubgController.getSplitPlayer);

soloPubgRouters.post("/addTempSplitPlayer" ,checkAuth, soloPubgController.addTempSplitPlayer);

soloPubgRouters.post("/getSplitPlayerDate" ,checkAuth, soloPubgController.getSplitPlayerDate);

soloPubgRouters.post("/getRegisterHackers" ,checkAuth, soloPubgController.getRegisterHackers);

soloPubgRouters.post("/getEmailHacker" ,checkAuth, soloPubgController.getEmailHacker);

soloPubgRouters.post("/addHackers" ,checkAuth, soloPubgController.addHackers);

soloPubgRouters.post("/getLastHackersRound" ,checkAuth, soloPubgController.getLastHackersRound);

soloPubgRouters.post("/deleteReportHacker" ,checkAuth, soloPubgController.deleteReportHacker);

soloPubgRouters.post("/addWinners" ,checkAuth, soloPubgController.addWinners);

soloPubgRouters.post("/deleteWinner" ,checkAuth, soloPubgController.deleteWinner);

soloPubgRouters.post("/getLastHackersAndWinnersRound" ,checkAuth, soloPubgController.getLastHackersAndWinnersRound);

soloPubgRouters.post("/addTempHackersAndWinners" ,checkAuth, soloPubgController.addTempHackersAndWinners);

soloPubgRouters.post("/getLastHackersAndWinnersTempRound" ,checkAuth, soloPubgController.getLastHackersAndWinnersTempRound);

soloPubgRouters.post("/addHackersAndWinners" ,checkAuth, soloPubgController.addHackersAndWinners);

soloPubgRouters.post("/deleteTempHackersAndWinnersLR" ,checkAuth, soloPubgController.deleteTempHackersAndWinnersLR);

soloPubgRouters.post("/getAllTempHackers" ,checkAuth, soloPubgController.getAllTempHackers);

soloPubgRouters.post("/getAllHackers" ,checkAuth, soloPubgController.getAllHackers);

soloPubgRouters.post("/addSubBlackList" ,checkAuth, soloPubgController.addSubBlackList);

soloPubgRouters.post("/addPhones" ,checkAuth, soloPubgController.addPhones);

soloPubgRouters.post("/getAllPhonesNumbers" ,checkAuth, soloPubgController.getAllPhonesNumbers);

soloPubgRouters.post("/getPhoneNumberPhones" ,checkAuth, soloPubgController.getPhoneNumberPhones);

soloPubgRouters.post("/getPhoneNumberRegister" ,checkAuth, soloPubgController.getPhoneNumberRegister);

soloPubgRouters.post("/getRegisterPlayersData" ,checkAuth, soloPubgController.getRegisterPlayersData);

soloPubgRouters.post("/deletePhoneNumber" ,checkAuth, soloPubgController.deletePhoneNumber);

soloPubgRouters.post("/deleteAllPhonesNumbers" ,checkAuth, soloPubgController.deleteAllPhonesNumbers);

soloPubgRouters.post("/getSpecificRamadan" ,checkAuth, soloPubgController.getSpecificRamadan);

soloPubgRouters.post("/addSpecificRamadan" ,checkAuth, soloPubgController.addSpecificRamadan);

soloPubgRouters.post("/deleteSpecificRamadan" ,checkAuth, soloPubgController.deleteSpecificRamadan);

soloPubgRouters.post("/getTimeSpecificRamadan" ,checkAuth, soloPubgController.getTimeSpecificRamadan);

soloPubgRouters.post("/getAllPlayersData" ,checkAuth, soloPubgController.getAllPlayersData);

soloPubgRouters.post("/addTotalPlayersServer" ,checkAuth, soloPubgController.addTotalPlayersServer);

/*test*/
soloPubgRouters.post("/addPlayersForTest" ,checkAuth, soloPubgController.addPlayersForTest);

module.exports = soloPubgRouters;