const express = require('express') //express를 설치했기 때문에 가져올 수 있다.
const app = express()


const mongoose = require('mongoose')
const config = require('./config/key');

const port = 5000
const { User } = require('./models/User.js')
const cookieParser = require('cookie-parser')



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())

mongoose.connect(config.mongoURI, {})
  .then(() => console.log('MongoDB connected...'))
  .catch(error => console.log(error))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/user/register', (req, res) => {
  const user = new User(req.body)



  user.save((error, userInfo) => {
    if (error) return res.json({ success: false, error })
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/api/user/login', (req, res) => {
  //요청된 이메일을 데이터베이스에서 찾는다
  User.findOne({ email: req.body.email }, (err, userInfo) => {
    if (!userInfo) {
      return res.json({
        loginSuccess: false,
        message: "이메일이 일치하지 않습니다"
      })
    }
    userInfo.comparePassword(req.body.password, (err, isMatch) =>{
  
      if(!isMatch)return res.json({loginSuccess:false, message: "비밀번호가 틀렸습니다"});
      // userInfo.generateToken((err, user) => {
      //   console.log(11)
      //   if(err) return res.status(400).send(err);
      //토큰을 쿠키,로컬스토리지등에 저장할 수 있음, cookie에 x_auth라는 부분에 token 저장   
        console.log('success')
        res.cookie("x_auth", userInfo)
          .status(200)
          .json({ loginSuccess: true, userId: userInfo._id })
      // })
    })
      
    })
  })

app.get('/api/hello', (req,res) =>{
  res.send("안녕하세요~")
})



app.listen(5000)