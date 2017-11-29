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
        rest.getfunds(url,session, date, payee, function(message,session,date1,payee1){
            console.log("getfunddd2");
         var   all_payments = JSON.parse(message);
        
           // var ob1 =  JSON.parse(date);
            //var ob2 = JSON.parse(payee);
            for(var i in all_payments) {
                 if (all_payments[i].date == date1 && all_payments[i].payee == payee1) {
                    
                    console.log(all_payments[i].id);
                    rest.deletefunds(url,session,payee,date, all_payments[i].id,handleDeletedFoodResponse)
    
                }
                
            }
    
    
        });
    
    
    };

    function handleDeletedFoodResponse (body,session,payee, date) {
    session.send("Succecfully deleted the payment for %s on %s", payee, date);


    };