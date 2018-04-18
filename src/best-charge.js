'use strict';

function bestCharge(selectedItems) {
  var selectedItemsArr = getSelectedItemsArr(selectedItems)
  var originalTotoalPrice = countSelectedItemsPrice(selectedItemsArr);
  var allPromotionPrice = countAllPromotionPrice(selectedItemsArr, originalTotoalPrice);
  var bestCharge = countBestPromotion(allPromotionPrice, originalTotoalPrice);
  var outputSelected = '';
  for(var i in selectedItemsArr){
    outputSelected = selectedItemsArr[i].name +'x'+selectedItemsArr[i].name+'='+selectedItemsArr[i].num*selectedItemsArr[i].price + '元\n';
  }
  var outputPromotion = '使用优惠:\n' + bestCharge.promotion + ', 省' + (originalTotoalPrice - bestCharge.actualMoney) + '元\n';
  var output = '============= 订餐明细 =============\n'+outputSelected+'-----------------------------------\n'+outputPromotion+'-----------------------------------\n'+'总计：'+bestCharge.actualMoney+'元\n'+'===================================';
  return output/*TODO*/;
}
module.exports = bestCharge;

