function countBestPromotionPrice(allPromotionPrice, money){
    var promotion = loadPromotions();
    var promotion1 = promotion[1].type;
    var promotion2 = promotion[2].type;
    var money1 = allPromotionPrice.money1;
    var money2 = allPromotionPrice.money2;
    if(money1 && money2){
        if(money1 >= money2){
            actualMoney = money1;
            promotion = promotion1;
        }else{
            actualMoney = money2;
            promotion = promotion2;
        }
    }else if(money1 && (!money2)){
        actualMoney = money1;
        promotion = promotion1;
    }else if((!money1) && money2){
        actualMoney = money2;
        promotion = promotion2;
    }else{
        promotion = '';
    }
    return {
        'actualMoney': actualMoney, 
        'promotion': promotion
    };
}