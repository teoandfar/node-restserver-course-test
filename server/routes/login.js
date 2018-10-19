const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);







const User = require('../models/user');



const app = express();


app.post('/login', (req, res) => {

    let body = req.body;

    User.findOne({ email: body.email }, (err, userDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(User) or password invalid!'
                }
            })
        }

        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User or (password) invalid!'
                }
            })
        }

        // let token = jwt.sign({
        //     user: userDB
        // }, 'this-is-the-development-seed', { expiresIn: 60 * 60 * 24 * 30 });
        // let token = jwt.sign({
        //     user: userDB
        // }, process.env.SEED, { expiresIn: 60 * 60 * 24 * 30 });
        let token = jwt.sign({
            user: userDB
        }, process.env.SEED, { expiresIn: process.env.CADUCITY_TOKEN });

        res.json({
            ok: true,
            user: userDB,
            token
        });

    })

});


// async function verify() {
async function verify(token) {
    // try {
    const ticket = await client.verifyIdToken({
        idToken: token,
        // audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    // const userid = payload['sub'];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];
    console.log(payload.name);
    console.log(payload.email);
    console.log(payload.picture);
    console.log(payload.exp / 1000);

    return {
        name: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true

    }
    // } catch (err) {
    //     return res.status(403).json({
    //         ok: false,
    //         err: {
    //             message: 'Token is not valid'
    //         }
    //     })
    // }
}
// verify().catch(console.error);




// app.post('/google', (req, res) => {
app.post('/google', async(req, res) => {
    let token = req.body.idtoken;

    // res.json({
    //     body: req.body
    // })

    let googleUser;

    try {

        googleUser = await verify(token)
            // .catch(e => {
            //     return res.status(403).json({
            //         ok: false,
            //         err: e
            //     })
            // });
    } catch (err) {
        return res.status(403).json({
            ok: false,
            err: {
                message: 'Token is not valid'
            }
        })
    }


    User.findOne({ email: googleUser.email }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (userDB) {
            if (!userDB.google) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'You should use your previous credential'
                    }
                })
            } else {
                let token = jwt.sign({
                    user: userDB
                }, process.env.SEED, { expiresIn: process.env.CADUCITY_TOKEN });

                return res.json({
                    ok: true,
                    user: userDB,
                    token
                })
            }
        } else {
            // user doesn't exist in DB
            let user = new User();

            user.name = googleUser.name;
            user.email = googleUser.email;
            user.img = googleUser.img;
            user.google = true;
            user.password = ':)';

            user.save((err, userDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }


                let token = jwt.sign({
                    user: userDB
                }, process.env.SEED, { expiresIn: process.env.CADUCITY_TOKEN })



                res.json({
                    ok: true,
                    user: userDB,
                    token
                })
            })

        }

    })

    // res.json({
    //     token
    // })
    // res.json({
    //     user: googleUser
    // })
})


module.exports = app;