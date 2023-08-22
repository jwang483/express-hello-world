const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(cors({
    origin: ["cs-406-personal-website.vercel.app"],
    methods: ['GET', 'POST'],
    credentials: true
}))

app.get('/', (req, res) => {
    res.json('hello');
})

app.post('/send', async (req, res) => {
    let { subject, email, text } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'wangjia3@oregonstate.edu',
            pass: 'Ycai346@gatech'
        }
    });

    let mailOptions = {
        from: email,
        to: 'wangjia3@oregonstate.edu',
        subject,
        text
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            res.json({
                status: 'fail',
                error: err.message,
            });
        } else {
            res.json({
                status: 'success',
            });
        }
    })
})


app.listen(3001, () => {
  console.log(`Server is running);
});
