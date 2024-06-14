const express = require('express');

const {connectToMongoDb}= require("./connect");

const URL = require('./models/url');

const urlRoute = require('./routes/url');

const staticRoute = require('./routes/staticRouter');

const path = require('path');

const app = express();
const PORT = 8001;

connectToMongoDb("mongodb://127.0.0.1:27017/Url_DBS")

//middleware use 
app.use(express.json());
app.use(express.urlencoded({extended:false}));//to handle form parse data 



// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views',path.resolve("./views"));

//SSR Demo Part 
/*app.get("/test", async (req, res) => {
    const allUrls = await URL.find({});
    return res.render('home',{
        urls: allUrls,
    });
    
});*/



app.use('/url',urlRoute);

app.use('/',staticRoute);



app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOne({ shortId: shortId });

    if (entry) {
        // If you want to update the entry, you should use findOneAndUpdate
        const updatedEntry = await URL.findOneAndUpdate(
            { shortId: shortId },
            { $push: { visitHistory: new Date() } }, // Assuming visitHistory is an array of dates
            { new: true } // This option returns the updated document
        );

        res.redirect(updatedEntry.redirectURL);
    } else {
        res.status(404).send('URL not found');
    }
});

app.listen(PORT,()=>console.log(`server Started at Port: ${PORT}`));


//To test URl - localhost:8001/ur/urlId