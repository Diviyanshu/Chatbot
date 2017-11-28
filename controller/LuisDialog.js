var builder = require('botbuilder');
var getb = require('./getbalance');
var gett = require('./gettransaction');
var currencyexp = require('./currencycard');


exports.dialog1 = function (bot) {

    bot.dialog('greetings', 
    // Step 1
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    })


}


exports.startDialog = function (bot) {
    
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/42d8af00-4f36-4a5c-96bb-b2fefa15b63a?subscription-key=6938febe65964e5eb0f53847d20e58a9&verbose=true&timezoneOffset=0&q=');
    
    bot.recognizer(recognizer);


    

    bot.dialog('GetBalance', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            session.send("Retrieving balance");
            getb.displaybalance(session);
        },
    ]).triggerAction({
        matches: 'GetBalance'
    });



    bot.dialog('LastTransaction', [
        function (session, args, next) {
            session.dialogData.args = args || {};   
            var Entdate = builder.EntityRecognizer.findEntity(args.intent.entities, 'date');     
            session.send("Retrieving your transactions...");
            gett.displaytransaction(session, Entdate.entity);
        },
        
    
    ]).triggerAction({
        matches: 'LastTransaction'
    });


    bot.dialog('GetCurrency', function (session, args) {
        var baseCurrency = builder.EntityRecognizer.findEntity(args.intent.entities, 'basecurrency');
        var currency = builder.EntityRecognizer.findEntity(args.intent.entities, 'currency');
        
        // Checks if the for entity was found
        if (baseCurrency && currency) {
            // Pulls out the food entity from the session if it exists
      
           // session.send('fetching latest rates...');
            currencyexp.displaycurrency(session,baseCurrency.entity, currency.entity);
        }
        
        else {
            session.send("No currency identified! Please try again");
        }
        

    }).triggerAction({
        matches: 'GetCurrency'
    });

    
    bot.dialog('WelcomeMessage', [
        function (session, args) {
            session.dialogData.args = args || {};        
            session.send("Hi, welcome to Contoso banking , We can help you with your everyday banking activites inclding" + "\n" + "jak");
            session.send("Hi");
           
        },
       
    ]).triggerAction({
        matches: 'WelcomeMessage'
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


