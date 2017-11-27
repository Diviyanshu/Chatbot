var builder = require('botbuilder');
var getb = require('./getbalance');
var currencyexp = require('./currencycard');


exports.startDialog = function (bot) {

    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/42d8af00-4f36-4a5c-96bb-b2fefa15b63a?subscription-key=6938febe65964e5eb0f53847d20e58a9&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);

    bot.dialog('GetBalance', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Enter a username to setup your account.");                
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {
            //if (!isAttachment(session)) {

                if (results.response) {
                    session.conversationData["username"] = results.response;
                }

                session.send("Retrieving data");
                getb.displaybalance(session, session.conversationData["username"]);  // <---- THIS LINE HERE IS WHAT WE NEED 
            
        }
    ]).triggerAction({
        matches: 'GetBalance'
    });

bot.dialog('GetCurrency', function (session, args) {
        var baseCurrency = builder.EntityRecognizer.findEntity(args.intent.entities, 'basecurrency');
        var currency = builder.EntityRecognizer.findEntity(args.intent.entities, 'currency');
        
        // Checks if the for entity was found
        if (baseCurrency && currency) {
            // Pulls out the food entity from the session if it exists
      
            session.send('fetching latest rates...');
            currencyexp.displaycurrency(session,baseCurrency.entity, currency.entity);
        }
        
        else {
            session.send("No currency identified! Please try again");
        }
        

    }).triggerAction({
        matches: 'GetCurrency'
    });

    

    


}

// Function is called when the user inputs an attachment
function isAttachment(session) { 
    var msg = session.message.text;
    if ((session.message.attachments && session.message.attachments.length > 0) || msg.includes("http")) {
        
        //call custom vision here later
        return true;
    }
    else {
        return false;
    }
}


