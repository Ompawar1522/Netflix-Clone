const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodoverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require("./Util/ExpressError");
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user')
// const dbUrl= process.env.DB_URL
const MongoDBStore = require('connect-mongo');
const Review = require('./models/review');

// mongodb/ mongoose intiialization code
urlLocal = 'mongodb://localhost:27017/Netflix'
// Dburl = process.env.DB_URL
mongoose.connect(urlLocal, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const app = express();

// setting up HTML(EJS)
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
// url related stuff
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const secret = process.env.SECRET || 'thisASecret';
// used for storing session id on our mongo servers

const store = new MongoDBStore({
    mongoUrl: urlLocal,
    secret,
    touchAfter: 24 * 3600
})

store.on("error", function (e) {
    console.log("session Store error", e)
})

// settings for session id
const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }

}
app.use(session(sessionConfig));
app.use(flash());

// authenticating
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// frequently used variables made available globally
app.use((req, res, next) => {

    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
})

app.get('/', (req, res) => {
    res.render('Auth/landing')
})

app.get('/login', (req, res) => {
    res.render('Auth/login')
});

app.get('/register', (req, res) => {
    res.render('Auth/register')
});

app.post('/register', async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registertedUser = await User.register(user, password);
        req.login(registertedUser, err => {
            if (err) return next(err)
            req.flash('success', 'Welcome to yelpcamp');
            res.redirect('/login');
        })

    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
})

app.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), async (req, res, next) => {
    res.redirect('/home')
})

app.get('/home', async (req, res, next) => {
    CurrUser = req.user

    res.render('home/home', { CurrUser })
})

app.get('/favicon.ico', (req, res) => {
    return 'your faveicon'
})
app.get('/home/random', async (req, res, next) => {
    res.render("home/random")
})
app.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    var mid = id.match(/\d/g);
    mid = mid.join("");
    // console.log(parseInt(id))
    // mid = 444444
    CurrUser = req.user;
    const reviews = await Review.find({ movie_id: mid }).exec();

    res.render('home/about', { id, reviews, CurrUser })
})

app.get('/home/popular', async (req, res, next) => {
    res.render('home/popular')
})

app.get('/home/search', async (req, res, next) => {
    CurrUser = req.user;
    res.render('home/search', {CurrUser})
})

app.get('/home/random', async (req, res, next) => {
    res.render("/home/random")
})

app.get('/home/video',async (req, res, next) => {
    res.render('home/video')
})

app.post('/comments/:id', async (req, res, next) => {
    const { id } = req.params
    const review = Review(req.body.review)
    review.username = req.user.username
    review.movie_id = id
    await review.save()
    console.log(review)
    res.redirect(`/${id}`)

})

app.all('*', (req, res, next) => {
    next(new ExpressError("Page not found", 404))
})
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Something went wrong!";
    res.status(statusCode).render('error', { err });
})

// used for starting up the server
const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
})