var request = require('request')



exports.requestcurrency = function getData(url, session,callback, currency, basecurrency){
    
        request.get(url, function(err,res,body){
            if(err){
                console.log(err);
            }else {
                callback(body, session,currency, basecurrency);
            }
        });
    };

exports.getbalance = function getData(url, session, date, callback){
    request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function(err,res,body){
        if(err){
            console.log(err);
        }else {
            session.send("true");
            callback(body, session, date);
        }
    });
};



exports.gettransaction = function getData(url, session, date, callback){
    request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function(err,res,body){
        if(err){
            console.log(err);
        }else {
            session.send("true");
            callback(body, session, date);
        }
    });
};

