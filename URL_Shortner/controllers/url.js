const URL = require('../models/url');

let nanoid;

// Import nanoid asynchronously
import('nanoid').then((nano) => {
    nanoid = nano.nanoid;
}).catch((error) => {
    console.error('Failed to load nanoid:', error);
});

async function handlegenerateNewShortUrl(req, res){
    // Ensure nanoid is loaded
if (!nanoid) {
    return res.status(500).json({ error: 'Failed to load nanoid' });
}

// Check if URL is provided
if (!req.body.url) { // Corrected here
    return res.status(400).json({ error: 'No URL provided' });
}

const shortID = nanoid(8);
await URL.create({
    shortId: shortID,
    redirectURL: req.body.url, // Corrected here
    visitHistory:[],
    createdBy: req.user._id,
});
return res.render('home',{
    id: shortID,

})
//return res.json({id:shortID});
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports = {
    handlegenerateNewShortUrl,
    handleGetAnalytics,
}