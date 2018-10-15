const jwt = require('jsonwebtoken');



// ==========================
// Verify Token
// ==========================

let verifyToken = (req, res, next) => {
    let token = req.get('token');
    console.log(process.env.SEED);
    jwt.verify(token, process.env.SEED, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    ok: false,
                    err: {
                        message: 'Invalid Token'
                    }
                })
            }
            console.log("decodificado", decoded);
            req.user = decoded.user;
            next();
        })
        // res.json({
        //     token: token
        // })
}

// ==========================
// Verify Admin Role
// ==========================

let verifyAdminRole = (req, res, next) => {
    console.log('decodificado2?');
    let user = req.user;

    if (user.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: "The user doesn't have the privilegies the execute this task"
            }
        })
    }


}

module.exports = {
    verifyToken,
    verifyAdminRole
}