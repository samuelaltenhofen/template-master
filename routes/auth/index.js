var router = express.Router()
var {
    authToken,
    authTokenInfo,
    authCredentials,
} = require("../middleware/middlewareToken")

// #region Authorization
router.use(authToken)
router.use(authTokenInfo)
router.use(authCredentials)

const example = require("./example")
router.use("/example", example)

module.exports = router
