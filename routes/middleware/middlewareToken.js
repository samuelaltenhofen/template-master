var establishmentModel = models.get("establishmentModel")

module.exports = {
    authToken: (req, res, next) => {
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers.authorization
        // decode token
        if (token) {
        // verifies secret and checks exp
            jwt.verify(token, config.authKey, function (err, decoded) {
                if (err) {
                    res.json({ success: false, err: "Failed to authenticate token." })
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded
                    next()
                }
            })
        } else {
            res.status(403).json({
                success: false,
                err: "No token provided.",
            })
        }
    },
    authTokenInfo: (req, res, next) => {
        if (req.decoded.idpage != undefined && req.decoded._id != undefined) {
            next()
        } else {
            res.status(403).json({
                success: false,
                err: "Token do not contain correct info.",
            })
        }
    },
    authCredentials: (req, res, next) => {
        establishmentModel.findOne({ page: req.decoded.idpage }, { "sign.active": 1 }).lean().then(function (data){
            if (data) {
                if (data.sign.active) {
                    next()
                } else {
                    res.status(402).json({
                        success: false,
                        err: "Ops! Verifiquei aqui que há pendencias de pagamento no nosso sistema. Por favor atualize os dados de pagamento e tente novamente.",
                        payment: true,
                    })
                }
            } else {
                console.log("------------------------------------------------------------------------------")
                console.log("barradoo")
                console.log("------------------------------------------------------------------------------")
                res.status(403).json({
                    success: false,
                    err: "Ops! Ocorreu um erro ao verificar suas credenciais de acesso. Tente novamente.",
                })
            }
        })
            .catch(function (err){
                console.log("------------------------------------------------------------------------------")
                console.log("barradoo")
                console.log("------------------------------------------------------------------------------")
                console.log(err)
                res.status(403).json({
                    success: false,
                    err: "Ops! Ocorreu um erro ao verificar suas credenciais de acesso. Tente novamente.",
                })
            })
    },
}
