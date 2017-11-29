var restify = require('restify');
var builder = require('botbuilder');
var luis = require('./controller/LuisDialog');


// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: "c65314ac-fff5-4e86-945c-fdba06f57178",
    appPassword: "noFYRI69+|hnkanAWH567({"
});


server.post('/api/messages', connector.listen());


var bot = new builder.UniversalBot(connector, function (session) {
    
  

    session.send('Sorry, I did not understand \'%s\'. ', session.message.text);
});



luis.startDialog(bot);
 




