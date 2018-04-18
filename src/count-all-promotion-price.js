function countAllPromotionPrice(selectedItemsArr, money){
    var promotion = loadPromotions();
    var money1 = 0;
    var money2 = 0;
    var promotion1 = promotion[1].type;
    var promotion2 = promotion[2].type;
    if(money >= 30){
        money1 = money - 6;
    }
    for(var i in selectedItemsArr){
        for(var j in promotion.item){
            if(selectedItemsArr[i].id = promotion.item[j]){
                money2 = money - selectedItemsArr[i].num * selectedItemsArr[i].price * 0.5;
            }
        }  
    }

    return {
       'money1': money1,
       'money2': money2
    };
}