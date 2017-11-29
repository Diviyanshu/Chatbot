var builder = require('botbuilder');
var getb = require('./getbalance');
var gett = require('./gettransaction');
var currencyexp = require('./currencycard');
var getf = require('./getfunds');

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
            var checking = builder.EntityRecognizer.findEntity(args.intent.entities, 'checking');
            var savings = builder.EntityRecognizer.findEntity(args.intent.entities, 'saving');
            console.log (checking);
            if (checking) {
                session.send("Retrieving balance");
                console.log(checking.entity);
                getb.displaybalance(session,checking.entity);

            } 
            
            else if (savings) {
                getb.displaybalance(session,savings.entity); }
            
            else {"Sorry, could not identifi entity. Please try again";}
            
            
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
            session.send("Hello Divi, welcome to Contoso banking ,We can help you with your daily banking tasks including: \n\n - - - - - - - - - - - - - \n\n  - Checking your account balances \n\n - Transferring funds \n\n  - Getting information on the latest currency rates  "  );
            //session.send("Hi");
            //session.send("hello\n\nworld");
           
        },
       
    ]).triggerAction({
        matches: 'WelcomeMessage'
    });



    bot.dialog('SetupTransfer', [
       
            
            function (session) {
            
            builder.Prompts.text(session, "Please provide a date on which to schedule the payments: ");
            },       
            function (session, results) {
                session.dialogData.date = results.response;
                builder.Prompts.text(session, "Who will this payment be for?");
            },

            function (session, results) {
                session.dialogData.payee = results.response;
        
                // Process request and display reservation details
                
                builder.Prompts.text(session, "how much would you like to pay?");
            },


            function (session,results) 
            
            
            { 
                session.dialogData.funds = results.response;
                session.send('setting up automatic payements...');
            getf.sendfunds(session,session.dialogData.funds, session.dialogData.payee, session.dialogData.date); // <-- LINE WE WANT
            session.endDialog();
        }
        ])
            //var funds = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'funds');
            //var payee = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'payee');
            //var date = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'date');
            
                        
            
        
  
    .triggerAction({
        matches: 'SetupTransfer'
    });

    
    
    bot.dialog('DeleteTransfer', function (session, args) {
        var payee = builder.EntityRecognizer.findEntity(args.intent.entities, 'payee');
        var date = builder.EntityRecognizer.findEntity(args.intent.entities, 'date');
        
        // Checks if the for entity was found
        if (payee && date) {
            // Pulls out the food entity from the session if it exists
      
            session.send('check1...');
            getf.deletepayment(session,date.entity, payee.entity);
        }
        
        else {
            session.send("No payee identified! Please try again");
        }
        

    }).triggerAction({
        matches: 'DeleteTransfer'
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

