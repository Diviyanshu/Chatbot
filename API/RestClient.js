var request = require('request')

exports.getbalance = function getData(url, session, username, callback){
    request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function(err,res,body){
        if(err){
            console.log(err);
        }else {
            session.send("true");
            callback(body, session, username);
        }
    });
};