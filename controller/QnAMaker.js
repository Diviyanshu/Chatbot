var rest = require('../API/Restclient');

exports.talkToQnA = function postQnAResults(session, question){
    
    var url = 'https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases/2903906b-b2b6-49c4-9d07-aedd40e289e8/generateAnswer';
    rest.postQnAResults(url, session, question, handleQnA)
};

function handleQnA(body, session, question) {
    session.send(body.answers[0].answer);
};