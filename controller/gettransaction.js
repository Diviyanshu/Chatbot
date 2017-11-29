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
            
            if(dateResponse.length - 1) {
                allTransactions.push(RevicedTransactions);
            }
            else {
                allTransactions.push(RevicedTransactions + ', ');
            }
        }        
    }
    
    
    //var card = new builder.ReceiptCard();
    //card.items = allTransactions;
    var sendingString = "";
    for (var i in allTransactions) {
       
        (sendingString += (date1 + ":   "+  JSON.stringify(allTransactions[i]) + "\n\n" ));

    }
     
    
    
    
    session.send(sendingString);
    
    
}