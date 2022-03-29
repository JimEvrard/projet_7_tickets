import express from 'express'; //import d'express
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import session from 'express-session';
import User from './models/User.js';
import Admin from './models/Admin.js';
import fetch from 'node-fetch';
import { cryptPassword } from './customDependance/cryptPassword.js';
import { comparePassword } from './customDependance/cryptPassword.js';
import routeGuard from "./customDependance/authGuard.js"
import 'dotenv/config';



const app = express();
const db = process.env.BDD_URL;

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

app.get('/', async(req, res) => {
    let user = await User.findOne({ _id: req.session.userid })
    if (user) {
        res.redirect('/personal_page/' + req.session.userid);

    } else {
        res.render('./layout/home.html.twig', {
            url: '/'
        })
    }
});

app.get('/subscrite', async(req, res) => {
    res.render('./users/subscrite.html.twig', {
        url: '/subscrite'
    })
});

app.post('/subscrite', async(req, res) => {
    req.body.mdp = await cryptPassword(req.body.mdp)
    const user = new User(req.body)
    user.save();
    res.redirect('/')
})

app.get('/login', async(req, res) => {
    res.render('./users/login.html.twig', {
        url: '/login',
    })
});
app.get('/admin', async(req, res) => {
    let users = await User.find({ status: { $ne: "admin" } })
    res.render('./admin/admin.html.twig', {
        url: '/admin',
        users: users
    })
});

app.post('/login', async(req, res) => {
    const idUser = await User.findOne({ mail: req.body.mail })
    if (idUser) {
        let compare = await comparePassword(req.body.mdp, idUser.mdp)
        if (compare) {
            req.session.userid = idUser._id
            if (idUser.status == "admin") {
                res.redirect('/admin')
            } else {
                res.redirect('/personal_page/')

            }
        }

    } else {
        res.redirect("/")
    }

})


app.get('/personal_page/', routeGuard, async(req, res) => {
    let user = await User.findOne({ id: req.session.userid })
    if (user) {

        res.render('./users/personal_page.html.twig', {
            user: user,
            url: 'personal_page/:id',
        })
    } else {
        res.redirect("/");
    }
});


app.get('/logout', async(req, res) => {
    req.session.destroy()
    res.redirect('/login')
})

app.get('/pro_page/:id', async(req, res) => {
    let user = await User.findOne({ _id: req.params.id })
    res.render('./users/pro_page.html.twig', {
        user: user,
        url: 'pro_page/:id',

    })
});



app.get("/deleteUser/:id", async(req, res) => {
    let deleteUser = await User.deleteOne({ _id: req.params.id })
    if (deleteUser.deletedCount === 1) {
        res.redirect('/admin')
    }
    res.redirect("/admin")
});
app.get("/update", routeGuard, async(req, res) => {
    res.render('./users/update.html.twig', {
        user: req.session.user,
        url: 'update',

    })
});


app.post('/update/:id', routeGuard, async(req, res) => {
    let user = await User.updateOne({ _id: req.params.id }, req.body)
    if (user) {
        res.redirect('/personal_page')
    }

})


app.get("*", (req, res) => {
    res.redirect('/login')
});