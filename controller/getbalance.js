var rest = require('../API/Restclient');

exports.displaybalance = function getbalance(session, username){
    var url = 'https://BankDivi.azurewebsites.net/tables/banktable';
    
    rest.getbalance(url, session, handlebalanceResponse)
};


function handlebalanceResponse(message, session) {
    var balResponse = JSON.parse(message);
    
    
    
    var result_balance = balResponse[0].balance;
    session.send("Divi, your balance is: %s", result_balance);
        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
      
            //Add a comma after all favourite foods unless last one
             
            
              
    
    
    // Print all favourite foods for the user that is currently logged in
                   
    
}


