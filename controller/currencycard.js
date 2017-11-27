var rest = require('../API/Restclient');
var builder = require('botbuilder');

//Calls 'getcurrency' in RestClient.js with 'getFoodNutrition' as callback to get ndbno of food
exports.displaycurr = function getcurrency(session, baseCurrency, currency){
    var url = "https://api.fixer.io/latest?base=" + baseCurrency ;

    rest.requestcurrency(url, session, displaycurr, currency);
}


function displaycurr(message, session, currency) {
    //var attachment = [];
    var data = JSON.parse(message);
    
    var z1= currency.toUpperCase();
    session.send(z1);
    
    var base = data.rates[z1];
    var tr = JSON.stringify(base);
    
    
    
    session.send("true");
    session.send(tr);
        

    

    

    //Displays restaurant hero card carousel in chat box 
   
}