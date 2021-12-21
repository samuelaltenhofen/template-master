var orderModel = models.get("orderModel") // exemplo de model
const getOrder = (order_id) => {
    return orderModel.findOne({ _id: order_id }).lean()
}

module.exports = {
    getOrder,
}
