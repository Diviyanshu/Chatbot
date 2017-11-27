var rest = require('../API/Restclient');
var builder = require('botbuilder');

//Calls 'getcurrency' in RestClient.js with 'getFoodNutrition' as callback to get ndbno of food
exports.displaycurr = function getcurrency(session){
    var url = "https://api.fixer.io/latest?base=USD";

    rest.requestcurrency(url, session, displaycurr);
}


function displaycurr(message, session) {
    //var attachment = [];
    var data = JSON.parse(message);
    
    //For each restaurant, add herocard with name, address, image and url in attachment
  
       
    var base1 = data.base;
    session.send(base1);
        

    

    

    //Displays restaurant hero card carousel in chat box 
   
}