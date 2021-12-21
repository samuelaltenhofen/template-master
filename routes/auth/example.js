var router = express.Router()
var controller = require("../../controllers/example")

router.post("/", controller.notificationStatus)

module.exports = router
