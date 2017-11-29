var builder = require('botbuilder');
var getb = require('./getbalance');
var gett = require('./gettransaction');
var currencyexp = require('./currencycard');
var getf = require('./getfunds');
var qna =   require('./QnAMaker');





exports.startDialog = function (bot) {
    
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/42d8af00-4f36-4a5c-96bb-b2fefa15b63a?subscription-key=6938febe65964e5eb0f53847d20e58a9&verbose=true&timezoneOffset=0&q=');
    
    bot.recognizer(recognizer);


    

    bot.dialog('GetBalance', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            
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
           
           card= ( function createHeroCard(session) {
                return new builder.HeroCard(session)
                    .title('BotFramework Hero Card')
                    .subtitle('Your bots — wherever your users are talking')
                    .text('Build and connect intelligent bots to interact with your users naturally wherever they are, from text/sms to Skype, Slack, Office 365 mail and other popular services.')
                    .images([
                        builder.CardImage.create(session, 'https://sec.ch9.ms/ch9/7ff5/e07cfef0-aa3b-40bb-9baa-7c9ef8ff7ff5/buildreactionbotframework_960.jpg')
                    ])
                    .buttons([
                        builder.CardAction.openUrl(session, 'https://docs.microsoft.com/bot-framework/', 'Get Started')
                    ]);
            } )

            var message = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(card);
            session.send(message);
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
            
            
            getf.deletepayment(session,date.entity, payee.entity);
        }
        
        else {
            session.send("No payee identified! Please try again");
        }
        

    }).triggerAction({
        matches: 'DeleteTransfer'
    });
    


    bot.dialog('Faq', [
        function (session, args, next) {
            session.dialogData.args = args || {};
            builder.Prompts.text(session, "What is your question?");
        },
        function (session, results, next) {
            qna.talkToQnA(session, results.response);
        }
    ]).triggerAction({
        matches: 'Faq'
    });

    



}


