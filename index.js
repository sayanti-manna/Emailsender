const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv'); //it use us to manage environment variables which consists of sensitive data in a secure way

const app = express();
const port = 3000;

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname+"/public"));


const route = express.Router(); //any route file we are generating to call and work along with index.js


app.get("/",(req,res) =>{
    //res.send("Server is running");
    res.redirect("/create.html");
});

//create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    port:465,
    host: "smtp.gmail.com",
    auth:{
        user: 'msayanti38@gmail.com',
        pass:'yhmcnuewcqofmyzi',
    },
    secure: true,
});

route.post('/expmail',(req,res)=>{

    //console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const{to,subject,text}=req.body;
    const mailInfo = {
        from: 'msayanti38@gmail.com',
        to: email,
        subject: 'Sending email using Express Node JS',
        text: 'Hurry it was easy application',
        html:name
    };

    transporter.sendMail(mailInfo, function(err,info){
        if(err) {
            return console.log(err);
        }else{
            res.status(200).send({message:"Mail Send", message_id:info.message});}
    });
});

app.use('/api', route);

app.listen(port,()=>{
    console.log(`server listening on the port ${port}`);
});