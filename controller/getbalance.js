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


exports.deleteFavouriteFood = function deleteFavouriteFood(session,username,favouriteFood){
    var url  = 'https://BankDivi.azurewebsites.net/tables/banktable';


    rest.getFavouriteFood(url,session, username,function(message,session,username){
     var   allFoods = JSON.parse(message);

        for(var i in allFoods) 
{
            if (allFoods[i].favouriteFood === favouriteFood && allFoods[i].username === username) {

                console.log(allFoods[i]);

                rest.deleteFavouriteFood(url,session,username,favouriteFood, allFoods[i].id ,handleDeletedFoodResponse)

            }
        }


    });


};