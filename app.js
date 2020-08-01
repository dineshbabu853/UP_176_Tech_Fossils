const dialogflow = require('dialogflow');
const uuid = require('uuid'); //random unique identificaion number
const express =require('express');
const bodyParser = require('body-parser'); ///middleware for parsing post requests
const app= express();
const port = process.env.PORT || 5000;
const path = require('path');
const sessionId=uuid.v4();


app.get('/chatbot/botui/js/index.js', function (req, res) {
  const index = path.join(__dirname, 'botui', '/js/index.js');
  res.sendFile(index);
});

app.get('/favicon.ico', function (req, res) {
  const index = path.join(__dirname, 'botui', 'favicon.ico');
  res.sendFile(index);
});

app.get('/', function (req, res) {
  const index = path.join(__dirname, 'botui', 'index.html');
  res.sendFile(index);
});

app.get('/chatbot/public/css/style.css', function (req, res) {
  const index = path.join(__dirname, 'public', '/css/style.css');
  res.sendFile(index);
});

app.get('/chatbot/public/bot.png', function (req, res) {
  const index = path.join(__dirname, 'public', 'bot.png');
  res.sendFile(index);
});


app.use(bodyParser.urlencoded({
extended:false  //req.body obj will contain string or array
}))

app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.post('/',(req,res)=>{
  runSample(req.body.MSG).then(data=>{
    res.send({Reply:data})
  })
  })

app.post('/send-msg',(req,res)=>{
runSample(req.body.MSG).then(data=>{
  res.send({Reply:data})
})
})


async function runSample(msg,projectId = 'test-agent-nocirr') {
  const sessionId = uuid.v4();

  const sessionClient = new dialogflow.SessionsClient({
    keyFilename:"test-agent-10307ca3f713.json"
  });
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: msg,
        languageCode: 'en-US',
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
return result.fulfillmentText;

}


app.listen(port,()=>{
  console.log("running on port "+port);
})
