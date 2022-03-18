import express from 'express'; //import d'express
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import User from './public/assets/models/User.js';
import session from 'express-session';

const app = express();
const db = "mongodb+srv://Brice:ticketCo.RI7@ticketco.c6tdf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(db, err => {
    if (err) {
        console.error("Error" + err)
    } else {
        console.log("Connected at db")
    }
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./public/assets'));

app.listen(8080, () => {
    console.log("Servor Ok")
});

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}))



// <-----------------------------> Connect User <----------------------------->

app.get('/', async (req, res) => {
    res.render('./home.html.twig', {
    })
});