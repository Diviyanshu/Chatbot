var rest = require('../API/Restclient');
var builder = require('botbuilder');

//Calls 'getcurrency' in RestClient.js with 'getFoodNutrition' as callback to get ndbno of food
exports.displaycurrency = function getcurrency(session, baseCurrency, currency){
    var url = "https://api.fixer.io/latest?base=" + baseCurrency ;

    rest.requestcurrency(url, session, displaycurrency, currency,baseCurrency);
}


function displaycurrency(message, session, currency, basecurrency) {
   
    var data = JSON.parse(message);
    
    var upperCurrency= currency.toUpperCase();
    var upperBaseCurrency =  basecurrency.toUpperCase();
    
    var result = data.rates[upperCurrency];
    
    var result_String = JSON.stringify(result);
    var rounded_result = Math.round(result_String * 100) / 100;
    var fin = "One " + upperBaseCurrency + " is equal to " + rounded_result + " "+ upperCurrency;
    
    
    
    session.send(fin);
   
}