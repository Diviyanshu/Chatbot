var rest = require('../API/Restclient');
var builder = require('botbuilder');



exports.sendfunds = function postfunds(session, funds, payee, date){
    var url = 'https://BankDivi.azurewebsites.net/tables/UpcomingPayments';
    rest.postfunds(session, url, funds, payee,date, responsefunds);
};


function responsefunds(message, session, funds, payee, date) {
    //var funds_response = JSON.parse(message); 
    session.send("Successfully set up payments to %s every month on the %s of %s", payee, date, funds); 
    
    } 




    exports.deletepayment = function deletepayment(session,date,payee){
        var url  = 'https://BankDivi.azurewebsites.net/tables/UpcomingPayments';
    
        console.log("getfunddd1");
        rest.getfunds(url,session, date, payee, function(message,session,date,payee){
            console.log("getfunddd2");
         var   all_payments = JSON.parse(message);
         console.log("getfunddds");
            for(var i in all_payments) {
    
                if (all_payments[i].date === date && all_payments[i].payee === payee) {
    
                    console.log(all_payments[i]);
                    console.log("-------------");
                    console.log(all_payments[i].id);
                    rest.deletefunds(url,session,payee,date, all_payments[i].id,handleDeletedFoodResponse)
    
                }
            }
    
    
        });
    
    
    };

    function handleDeletedFoodResponse (body,session,payee, date) {
    session.send("FIN");


    };