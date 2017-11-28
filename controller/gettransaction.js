var rest = require('../API/Restclient');

exports.displaytransaction = function gettransacton(session, date){
    var url = 'https://BankDivi.azurewebsites.net/tables/banktable';
    
    rest.gettransacton(url, session, date, handleTransactionResponse)
};

function handleTransactionResponse(message, session, date) {
    var dateResponse = JSON.parse(message);
    var allTransactions = [];
    for (var index in dateResponse) {
        var dateRecived = dateResponse[index].date;
        var RevicedTransactions = dateResponse[index].TransactionDescription;

        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (date.toLowerCase() === dateRecived.toLowerCase()) {
            //Add a comma after all favourite foods unless last one
            if(dateResponse.length - 1) {
                allTransactions.push(RevicedTransactions);
            }
            else {
                allTransactions.push(RevicedTransactions + ', ');
            }
        }        
    }
    
    // Print all favourite foods for the user that is currently logged in
    session.send("%s, your favourite foods are: %s", date, allTransactions);                
    
}