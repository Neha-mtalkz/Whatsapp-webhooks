const employees = require("../controllers/employees");

const routes = [{
    method: 'GET',
    url: '/api/employees',
    handler: employees.getEmployees
},
{
    method: 'POST',
    url: '/api/whatsapp',
    handler: employees.whatsapp
}

]

module.exports = routes;

