const res = require('express/lib/response')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        required: 'Please enter your name',
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: 'Please enter your email',

    },
    password: {
        type: String,
        required: 'Please enter your password',

    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})
//save하기 전에 function을  실행시킬수있는 몽구스 함수
userSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {//비밀번호를 바꿀때만 암호화 하게 하는 것
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)
            //user= this를 통해 여기를 불러옴, 안에 password
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash
                next()
            })
        })
    }
})

userSchema.methods.comparePassword = function (plainPassword, cb) {

    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this;
    //jsonwebtoken을 이용해서 토큰을 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    //user._id + 'secretToken' = token
    //->
    //'secretToken' -> user._id
    user.token = token
    console.log(token);
    user.save(function(err, user){
        console.log(111);
        if(err) return cb(err);
        cb(null, user)

    })
}


const User = mongoose.model('User', userSchema)

module.exports = { User } //다른 곳에서도 쓸 수 있게끔