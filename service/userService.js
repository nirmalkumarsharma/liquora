const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const User = require('../entity/user');

const applicationConfig = require('./../application.json');

const SECRET = applicationConfig.env.SECRET_PHRASE;

exports.registerUser = (request, response, next) => {
    User.find({email: request.body.email}).exec().then(result => {
        if(result.length>=1){
            return response.status(422).json({
                error : 'User already exist'
            });
        } else {
            const safePassword = bcrypt.hash(request.body.password, 16, (error, hashedPassword) => {
                if(error) {
                    return response.status(500).json({
                        errorMessage: error
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email : request.body.email,
                        password : hashedPassword
                    });
                    user.save().then(result => {console.log(result)}).catch(error => console.log(error));
                    response.status(201).json({
                        message: "Successfully registered new user",
                        addedUser : user
                    });
                }
            });
        }
    }).catch(error => {
            console.log(error);
            response.status(500).json({
                errorMessage: error
        });
    });    
};

exports.deleteUser = (request, response, next) => {
    const id = request.params.userId;
    User.remove({_id: id}).exec().then(result => {
        response.status(200).json(result);
    }).catch(error => {
        console.log.error;
        response.status(500).json({
            errorMessage: error
        });
    });
};

exports.login = (request, response, next) => {
    User.find({email: request.body.email}).exec().then( user => {
        if(user.length < 1){
            return response.status(404).json({
                errorMessage: 'User doesn\'t exist'
            });
        } else {
            bcrypt.compare(request.body.password, user[0].password, (error, result) => {
                if(error) {
                    return response.status(401).json({
                        errorMessage: 'Authorization failed'
                    });
                } else if (result) {

                    const token = jwt.sign({
                        userId : user[0]._id,
                        email: user[0].email
                    }, SECRET, {
                        expiresIn: "1h"
                    });
                    return response.status(200).json({
                        message: 'Authorization successful',
                        bearerJWT: token
                    });
                } else {
                    return response.status(401).json({
                        errorMessage: 'Authorization failed'
                    });
                }
            });
        }
    }).catch(error => {
        console.log(error);
        response.status(500).json({
            errorMessage: error
        });
    });
};