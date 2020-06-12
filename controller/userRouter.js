const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const User = require('../entity/user');
const { request, response } = require('express');

router.post('/signup', (request, response, next) => {
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
});

router.delete('/:userId', (request, response, next) => {
    const id = request.params.userId;
    User.remove({_id: id}).exec().then(result => {
        response.status(200).json(result);
    }).catch(error => {
        console.log.error;
        response.status(500).json({
            errorMessage: error
        });
    });
});

module.exports = router;