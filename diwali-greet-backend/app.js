const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const {userRouter} = require('./routers/user.router');
const { geminiRouter } = require('./routers/gemini.router');
const cookieParser = require('cookie-parser')

dotenv.config();
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,  //allow cookies
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(bodyParser.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/gemini', geminiRouter);

app.get('/hello', (req, res)=>{
    res.send("Hello");
})
const PORT = process.env.PORT || 4000;

mongoose.connect('mongodb://localhost:27017/diwali-greet-card-backend', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log("Mongodb connected"))
.catch((err)=> console.log("error while connecting", err));
app.listen(PORT, ()=>{
    console.log(`Listening to the port ${PORT}`);
});