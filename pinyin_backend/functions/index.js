const functions = require('firebase-functions');
const cors = require('cors')({origin: true});


exports.helloWorld = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    var result="　"+request.body.hellotext;
    response.send(result);
  });
});
