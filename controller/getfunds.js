var rest = require('../API/Restclient');
var builder = require('botbuilder');



exports.sendfunds = function postfunds(session, funds, payee, date){
    var url = 'https://BankDivi.azurewebsites.net/tables/UpcomingPayments';
    rest.postfunds(session, url, funds, payee,date, responsefunds);
};


function responsefunds(message, session, funds, payee, date) {
    var funds_response = JSON.parse(message); 
    session.send("Successfully set up payments to %s every month on the %s of %s", payee, date, funds); 
    
    } 