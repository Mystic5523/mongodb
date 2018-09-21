const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const request = require("request");
const logger = require('morgan');
const cheerio = require("cheerio");
const db1 = require("./models");
const path = require('path');
// const indexRoutes = require('./routes/indexRoutes');
// const apiRoutes = require('./routes/apiRoutes');
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(logger('dev'));

app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// app.use('/', indexRoutes);
// app.use('/api', apiRoutes);

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/webscraper";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.get("/scrape", function (req, res) {

    request("https://www.kansascity.com/news/local/", function (error, response, html) {


        var $ = cheerio.load(html);
        var results = {};

        $("div.teaser").each(function (i, element) {

            // Save the text of the element in a "title" variable
            results.title = $(element).find('h3.value').text();
            results.summary = $(element).find('p.summary').text();
            results.link = $(element).find('a').attr('href').split(",")[0].split(" ")[0];
            
            if (results.summary !== '') {
                // db1.Article.remove({}, function(err) { 
                //     console.log('collection removed') 
                //  });
                db1.Article.create(results)
                    .then(function (data) {
                    })
                    .catch(function (err) {
                        return res.json(err);
                    });

            };
        });
        res.redirect('/')
    });
});

app.get("/", function (req, res) {
    // grab all the articles to display
    db1.Article.find({})
        .then(function (data) {
            var hbsObject = {
                articles: data
            }
            res.render('index', hbsObject)
            console.log(hbsObject)
        })

});

app.get('/article/:id', function (req, res) {
    db1.Article.findOne({ _id: req.params.id })
        .populate("comment")
        .then(function (article) {
            res.render('comment', { article })
            console.log(article)
        });

});

app.get('/save/:id', (req, res) => {
    // update article to saved when save is clicked changing saved to 'true'
    db1.Article
        .update({ _id: req.params.id }, { saved: true })
        .then(function () { res.redirect('/') })
        .catch(err => res.json(err));
});

app.get('/saved', function (req, res) {
    db1.Article.find({ "saved": true })
        .then(function (data) {
            var hbsObject = {
                articles: data
            }
            res.render('saved', hbsObject)
        })
})

app.put('/delete/:id', function (req, res) {
    db1.Article
        .update({ _id: req.params.id }, { $set: { saved: false } })
        .then(function () { res.redirect('saved') })
        .catch(function (err) {
            res.json(err);
        })
})

app.post('/comment/:id', function (req, res) {
    db1.Comment.create({ comment: req.body.comment })
        .then(function (comment) {

            return db1.Article.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { comment: comment._id } },
                { new: true }
            )
                .then(function () {
                    res.json(comment)
                })
        })
        // .then(function(){res.redirect('saved')})
        .catch(function (err) {
            res.json(err)
        })
})

app.put('/comment/:id', function (req, res) {
    db1.Comment
        .update({ _id: req.params.id }, { $set: { deleted: true } })
        .then(function () { res.redirect('saved') })
        .catch(function (err) {
            res.json(err);
        })
})



