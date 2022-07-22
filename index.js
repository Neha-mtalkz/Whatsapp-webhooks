const fastify = require('fastify')({
  logger: true
})
const request = require("request");
const config = require('./config');
const { url } = config;

fastify.post("/api/whatsapp", (req, res) => {
  try {
    let event = req.body['data_body']['events']['eventType'];
    if (event == "User initiated") {
      let sendData = req.body['data_body']['eventContent']['message']
      const options = {
        url: url,
        json: true,
        body: sendData
      };
      request.post(options, (err, res, body) => {
        if (err) {
          return console.log(err);
        }
        console.log(`Status: ${res.statusCode}`);
        console.log(body);
      })
      return res.send(res.statusCode);
    }
  }
  catch (err) {
    console.log(err)
    return err;
  }
})

// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err
  console.log(` Server is now listening on ${address}`)
})