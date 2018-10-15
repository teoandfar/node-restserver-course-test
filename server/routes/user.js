const express = require('express');
const bcrypt = require('bcryptjs');
const _ = require('underscore');

const User = require('../models/user');
const { verifyToken, verifyAdminRole } = require('../middlewares/authentication');



const app = express();

// app.get('/', function(req, res) {
//     // res.send('Hello World');
//     res.json('Hello World');
// });


// app.get('/user', function(req, res) {
//     res.json('get User');
// });


// app.get('/user', function(req, res) {
app.get('/user', verifyToken, function(req, res) {


    // return res.json({
    //     user: req.user,
    //     name: req.user.name,
    //     email: req.user.email
    // })


    let from = req.query.from || 0;
    from = Number(from);

    let limit = req.query.limit || 5;
    limit = Number(limit)



    // User.find({}).exec((err, users) => {
    // User.find({}).limit(5).exec((err, users) => {
    // User.find({}).skip(5).limit(5).exec((err, users) => {
    // User.find({}).skip(from).limit(5).exec((err, users) => {
    // User.find({}).skip(from).limit(limit).exec((err, users) => {
    // User.find({ google: true }).skip(from).limit(limit).exec((err, users) => {
    // User.find({ google: true }).skip(from).limit(limit).exec((err, users) => {
    // User.find({}, 'name email role').skip(from).limit(limit).exec((err, users) => {

    // (node:16856) DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
    // (node:16856) DeprecationWarning: collection.count is deprecated, and will be removed in a future version. Use collection.countDocuments or collection.estimatedDocumentCount instead


    User.find({ status: true }, 'name email role').skip(from).limit(limit).exec((err, users) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // User.count({}, (err, conteo) => {
        // User.count({ google: true }, (err, conteo) => {
        // User.count({ status: true }, (err, conteo) => {
        User.countDocuments({ status: true }, (err, conteo) => {

            res.json({
                ok: true,
                users,
                conteo
            })
        })
    })

});


app.post('/user', [verifyToken, verifyAdminRole], function(req, res) {
    let body = req.body;
    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })


    user.save((err, userDB) => {
        console.log(userDB);
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            user: userDB
        })
    })




    // if (body.name === undefined) {
    //     res.status(400).json({
    //         ok: false,
    //         message: 'name is necessary'
    //     });
    // } else {

    //     // res.json('post User');
    //     res.json({ body });
    // }
});
app.put('/user/:id', [verifyToken, verifyAdminRole], function(req, res) {

    let id = req.params.id;
    // let body = req.body;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status']);

    // no funcionan
    // delete body.password;
    // delete body.google;

    // User.findById(id, body, (err, userDB) => {
    //     userDB.save();
    // })
    // User.findByIdAndUpdate(id, body, (err, userDB) => {
    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({ ok: true, user: userDB });
    })

});
// app.delete('/user', function(req, res) {
app.delete('/user/:id', [verifyToken, verifyAdminRole], function(req, res) {
    // res.json('delete User');
    let id = req.params.id;

    let newStatus = {
        status: false
    }


    // User.findByIdAndRemove(id, (err, deletedUser) => {
    // User.findByIdAndUpdate(id, {}, (err, deletedUser) => {
    User.findByIdAndUpdate(id, newStatus, { new: true }, (err, deletedUser) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };


        if (!deletedUser) {

            return res.status(400).json({
                ok: true,
                err: {
                    message: 'User not found'
                }
            })
        }
        res.json({
            ok: true,
            user: deletedUser
        })
    })
});





module.exports = app;