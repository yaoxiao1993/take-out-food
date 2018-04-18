function getSelectedItemsArr(selectedItems){
  var allItems = loadAllItems();
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