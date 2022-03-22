const express = require('express') //express를 설치했기 때문에 가져올 수 있다.
const app = express()


const mongoose = require('mongoose')
const config = require('./config/key');

const port = 3000
const bodyParser = require('body-parser')
const {User} = require('./models/User.js')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(config.mongoURI, {  useNewUrlParser: true})
.then(() => console.log('MongoDB connected...'))
  .catch(error => console.log(error))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req,res) => {
  const user = new User(req.body)

  user.save((error, userInfo) => {
    if(error) return res.json({success: false, error})
    return res.status(200).json({
      success : true
    })
  })
})

app.listen(3000)