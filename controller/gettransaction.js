var rest = require('../API/Restclient');

exports.displaytransaction = function gettransaction(session, date){
    var url = 'https://BankDivi.azurewebsites.net/tables/transactions';
    
    rest.gettransaction(url, session, date, handleTransactionResponse)
};

function handleTransactionResponse(message, session, date1) {
    var dateResponse = JSON.parse(message);
    var allTransactions = [];
    for (var index in dateResponse) {
        var dateRecived = dateResponse[index].date;
        var RevicedTransactions = dateResponse[index].TransactionDescription;

        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (date1.toLowerCase() === dateRecived.toLowerCase()) {
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
    //var card = new builder.ReceiptCard();
    //card.items = allTransactions;
    var sendingString = ("Your transactions on %s are: %s",date1, JSON.stringify(allTransactions)); 
    
    
    console.log(sendingString);
    session.send(sendingString);
    
    
}