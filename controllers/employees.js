const employees = require("../employees.json");
const request = require("request");


const getEmployees = (req, res) => {
    return employees["employees"];
}

const whatsapp = async (req, res) => {
    try {
        let event = req.body['data_body']['events']['eventType'];
        if (event == "User initiated") {
            let sendData = req.body['data_body']['eventContent']['message']
            console.log(sendData)
            const options = {
                url: `https://nehatesting.free.beeceptor.com`,
                json: true,
                body: sendData
            };
            await request.post(options, (err, res, body) => {
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
}

module.exports = { getEmployees, whatsapp }