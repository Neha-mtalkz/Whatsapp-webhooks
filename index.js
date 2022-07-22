const fastify = require('fastify')({
  logger: true
})

const employeesRoutes = require('./routes/employees');
employeesRoutes.forEach((route, index) => {
    fastify.route(route)
})

// Declare a route
fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world' })
})

// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err
  console.log(` Server is now listening on ${address}`)
})