const port = 1234;
const host = 'localhost';
const { StreamChat } = require('stream-chat')
const cred = require('./src/credentials')
const { apiKey, apiSecret } = cred
const bodyParser = require('body-parser')
const serverClient = StreamChat.getInstance(apiKey, apiSecret)
var express = require('express')
var cors = require('cors')
const server = express()

server.use(cors())
const requestListener = function (req, res) {

  const { user } = req.body
  const token = serverClient.createToken(req.body.user || '');
  res.writeHead(200);

  res.end(JSON.stringify({ token, user, apiKey }));
};

server.use(bodyParser.json({ type: 'application/*+json' }))

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

server.post('/name', bodyParser.urlencoded({ extended: false }), requestListener)