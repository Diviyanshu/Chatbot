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

exports.getbalance = function getData(url, session, callback, balance){
    request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function(err,res,body){
        if(err){
            console.log(err);
        }else {
            session.send("true");
            callback(body, session, balance);
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


exports.postfunds = function getData(session, url, funds, payee,date, callback){
    var options = {
        url: url,
        method: 'POST',
        headers: {
            'ZUMO-API-VERSION': '2.0.0',
            'Content-Type':'application/json'
        },
        json: {
            "payee" : payee,
            "funds" : funds,
            "date": date
        }
      };
      
      request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body);
        }
        else{
            console.log(error);
            callback(body, session, funds, payee, date);
        }
      });
};


exports.getfunds = function getData(url, session, date, payee, callback){
    request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function(err,res,body){
        if(err){
            console.log(err);
        }else {
            session.send("true");
            callback(body, session, date,payee);
        }
    });
};




exports.postQnAResults = function getData(url, session, question, callback){
    var options = {
        url: url,
        method: 'POST',
        headers: {
            'Ocp-Apim-Subscription-Key': '419592df65b047258e810906ce4c211b',
            'Content-Type':'application/json'
        },
        json: {
            "question" : question
        }
      };
  
      request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            callback(body, session, question);
        }
        else{
            console.log(error);
        }
      });
  };






exports.deletefunds = function deleteData(url,session, payee ,date, id, callback){
    var options = {
        url: url + "\\" + id,
        method: 'DELETE',
        headers: {
            'ZUMO-API-VERSION': '2.0.0',
            'Content-Type':'application/json'
        }
    };

    request(options,function (err, res, body){
        if( !err && res.statusCode === 200){
            console.log(body);
            callback(body,session,payee, date);
        }else {
            console.log(err);
            console.log(res);
        }
    })

};