const fastify = require('fastify')({
  logger: true
})
const request = require("request");
const { url, key, source } = require('./config');

//WhatsApp cloud API .
fastify.post("/api/whatsapp", (req, res) => {
  try {
    let event = req.body['data_body']['events']['eventType'];
    //checking eventType is user initiative or not .
    if (event === "User initiated") {
      //defining the response body .
      let bodyData = {
        "message": req.body['data_body']['eventContent']['message']['text']['body'],
        "phone": req.body['data_body']['eventContent']['message']['from'],
        "source": source,
        "key": key
      }
      console.log(bodyData)
      const options = {
        url: url,
        json: true,
        body: bodyData
      };
      // Whatsapp webhook target API
      request.post(options, (err, response, body) => {
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
    return err;
  }
})

// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err
  console.log(` Server is now listening on ${address}`)
})