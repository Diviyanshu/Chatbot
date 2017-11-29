var rest = require('../API/Restclient');

exports.displaybalance = function getbalance(session, balance){
    var url = 'https://BankDivi.azurewebsites.net/tables/banktable';
    console.log("-------------------");
    console.log(typeof balance);
    rest.getbalance(url, session, handlebalanceResponse, balance)
};


function handlebalanceResponse(message, session, balance) {
    var balResponse = JSON.parse(message);
    var result_balance;
    if (balance.toLowerCase() == "checking") {   result_balance = balResponse[0].checking; 
        session.send("Divi, your %s balance is:$ %s ", balance, result_balance); 
    
    }
    else if (balance.toLowerCase() == "savings")   {  result_balance = balResponse[0].savings;  
        session.send("Divi, your %s balance is: $ %s ", balance, result_balance);
    }
    else {session.send("entities not identified, please try again.");}
    
    
       
             
            
              
    
    
    
                   
    
}


