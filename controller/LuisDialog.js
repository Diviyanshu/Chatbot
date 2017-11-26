var builder = require('botbuilder');
var getb = require('./getbalance');

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

    bot.dialog('DeleteFavourite', [
        function (session, args, next) {
            session.dialogData.args = args || {};
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Enter a username to setup your account.");
            } else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results,next) {
       // if (!isAttachment(session)) {

            session.send("You want to delete one of your favourite foods.");

            // Pulls out the food entity from the session if it exists
            var foodEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'food');

            // Checks if the for entity was found
            if (foodEntity) {
                session.send('Deleting \'%s\'...', foodEntity.entity);
                getb.deleteFavouriteFood(session,session.conversationData['username'],foodEntity.entity); //<--- CALLL WE WANT
            } else {
                session.send("No food identified! Please try again");
            
        }

    }
    
    ]).triggerAction({
        matches: 'DeleteFavourite'

    });

    bot.dialog('GetCalories', function (session, args) {
        if (!isAttachment(session)) {

            // Pulls out the food entity from the session if it exists
            var foodEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'food');

            // Checks if the for entity was found
            if (foodEntity) {
                session.send('Calculating calories in %s...', foodEntity.entity);
                // Insert logic here later

            } else {
                session.send("No food identified! Please try again");
            }
        }
    }).triggerAction({
        matches: 'GetCalories'
    });


    


    bot.dialog('LookForFavourite', [
        // Insert logic here later
    ]).triggerAction({
        matches: 'LookForFavourite'
    });
    

    bot.dialog('WelcomeIntent', [
        // Insert logic here later
    ]).triggerAction({
        matches: 'WelcomeIntent'
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


