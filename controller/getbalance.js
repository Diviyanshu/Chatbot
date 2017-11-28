var rest = require('../API/Restclient');

exports.displaybalance = function getbalance(session, username){
    var url = 'https://BankDivi.azurewebsites.net/tables/banktable';
    
    rest.getbalance(url, session, username, handlebalanceResponse)
};


function handlebalanceResponse(message, session, username) {
    var balResponse = JSON.parse(message);
    var finalbalance = [];
    
        var usernameReceived = balResponse[0].Username;
        var balance = balResponse[0].finalbalance;

        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase()) {
            //Add a comma after all favourite foods unless last one
            session.send("%s, your balance is: %s", username, balance); 
            
        }        
    
    
    // Print all favourite foods for the user that is currently logged in
                   
    
}


