const fastify = require('fastify')({
  logger: true
})
const request = require("request");
const { url, key, source } = require('./config');

//WhatsApp cloud API .
fastify.post("/api/whatsapp/:chatbot", (req, res) => {
  try {
    let event = req.body.data_body?.events?.eventType;
    //checking eventType is user initiative or not .
    if (event === "User initiated") {
      //defining the response body
      let bodyData = {
        "message": req.body.data_body?.eventContent?.message?.text.body,
        "phone": req.body.data_body?.eventContent?.message?.from,
        "source": source,
        "key": key
      }
      const options = {
        url: url + req.params.chatbot,
        json: true,
        body: bodyData
      };
      // Whatsapp webhook target API
      request.post(options, (err, response, body) => {
        if (err) {
          return err;
        }
        fastify.log.info(`Status: ${response.statusCode}`);
        fastify.log.info(body);
        return res.send({ status: true });
      })
    }
  }
  catch (err) {
    fastify.log.error(err)
    return err;
  }
})

// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err
  fastify.log.info(` Server is now listening on ${address}`)
})