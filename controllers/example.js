const order = require("../services/order") // exemplo de services

const notificationStatus = (req, res) => {
    console.log("faça algo aqui")
    // faça alguma coisa
    res.status(200).send()
}

module.exports = {
    notificationStatus,
}
