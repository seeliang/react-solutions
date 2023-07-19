const http = require("http")
const port = 1234;
const host = 'localhost';
const { StreamChat } = require('stream-chat')
const cred = require('./credentials')
const { apiKey, apiSecret } = cred

const serverClient = StreamChat.getInstance(apiKey, apiSecret)

const requestListener = function (req, res) {
  const token = serverClient.createToken('this boy');
  res.writeHead(200);
  console.log(req, token)
  res.end("My first server!");
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});