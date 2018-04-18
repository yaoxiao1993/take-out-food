'use strict';
var loadAllItems = require('../src/items.js');
var loadPromotions = require('../src/promotions.js');

function getSelectedItemsArr(selectedItems){
  var selectedItemsArr = [];
  for(var i in selectedItems){
    var selectedItemsObj = {};
    var num = selectedItems[i].match(/[\d]+/);
    if(num){
      selectedItemsObj.id = selectedItems[i].substr(0,8)
      selectedItemsObj.num = selectedItems[i].substr(11)
    }
    selectedItemsArr.push(selectedItemsObj);
  }
  return selectedItemsArr;
}

  
function countSelectedItemsPrice(selectedItemsArr){
  var allItems = loadAllItems();
  var originalTotoalPrice = 0;
  for(var i in selectedItemsArr){
    for(var j in allItems){
      if(selectedItemsArr[i].id === allItems[j].id){
        originalTotoalPrice = originalTotoalPrice + selectedItemsArr[i].num * allItems[j].price;
        selectedItemsArr[i].price = allItems[j].price;
        selectedItemsArr[i].name = allItems[j].name;
      }
    }
  }
  return originalTotoalPrice;
}

function countAllPromotionPrice(selectedItemsArr, originalTotoalPrice){
  var promotion = loadPromotions();
  var money1 = 0;
  var money2 = 0;
  if(originalTotoalPrice >= 30){
      money1 = originalTotoalPrice - 6;
  }
  for(var i in selectedItemsArr){
      for(var j in promotion[1].items){
          if(selectedItemsArr[i].id === promotion[1].items[j]){ 
              money2 = originalTotoalPrice - selectedItemsArr[i].num * selectedItemsArr[i].price * 0.5;
              originalTotoalPrice = money2;
              break;
          }
      }  
  }

  return {
     'money1': money1,
     'money2': money2
  };
}

function getSelectedHalfPriceItems(selectedItemsArr){
  var promotion = loadPromotions();
  var selectedHalfPriceItems = [];
  for(var i in selectedItemsArr){
      for(var j in promotion[1].items){
          if(selectedItemsArr[i].id === promotion[1].items[j]){
              selectedHalfPriceItems.push(selectedItemsArr[i].name);
              break;
          }
      }  
  }
  return selectedHalfPriceItems;
}

function countBestPromotion(allPromotionPrice, originalTotoalPrice){
  var promotion = loadPromotions();
  var promotion1 = promotion[0].type;
  var promotion2 = promotion[1].type;
  var money1 = allPromotionPrice.money1;
  var money2 = allPromotionPrice.money2;
  var actualMoney = 0;
  if(money1 && money2){
      if(money1 >= money2){
          actualMoney = money2;
          promotion = promotion2;
      }else{
          actualMoney = money1;
          promotion = promotion1;
      }
  }else if(money1 && (!money2)){
      actualMoney = money1;
      promotion = promotion1;
  }else if((!money1) && money2){
      actualMoney = money2;
      promotion = promotion2;
  }else{
      actualMoney = originalTotoalPrice;
      promotion = '';
  }
  return {
      'actualMoney': actualMoney, 
      'promotion': promotion
  };
}

function bestCharge(selectedItems) {
  var selectedItemsArr = getSelectedItemsArr(selectedItems)
  var originalTotoalPrice = countSelectedItemsPrice(selectedItemsArr);
  var allPromotionPrice = countAllPromotionPrice(selectedItemsArr, originalTotoalPrice);
  var bestCharge = countBestPromotion(allPromotionPrice, originalTotoalPrice);
  var selectedHalfPriceItems = getSelectedHalfPriceItems(selectedItemsArr);
  var outputSelected = '';
  for(var i in selectedItemsArr){
    outputSelected = outputSelected+selectedItemsArr[i].name +' x '+selectedItemsArr[i].num+' = '+selectedItemsArr[i].num*selectedItemsArr[i].price + '元\n';
  }

  var outputPromotion = '';
  if(bestCharge.promotion === loadPromotions()[1].type){
    outputPromotion = '使用优惠:\n' + bestCharge.promotion +'('+selectedHalfPriceItems[0]+'，'+selectedHalfPriceItems[1]+')，省' + (originalTotoalPrice - bestCharge.actualMoney) + '元\n-----------------------------------\n';
  }else if(bestCharge.promotion === loadPromotions()[0].type){
    outputPromotion = '使用优惠:\n' + bestCharge.promotion + '，省' + (originalTotoalPrice - bestCharge.actualMoney) + '元\n-----------------------------------\n';
  }

  var output = '============= 订餐明细 =============\n'+outputSelected+'-----------------------------------\n'+outputPromotion+'总计：'+bestCharge.actualMoney+'元\n'+'===================================';
  return output/*TODO*/;
}

// var selectedItems = ["ITEM0013 x 4"];
// bestCharge(selectedItems);

module.exports = bestCharge;

