const fs = require('fs');

module.exports.logReqRes = function(filename) {
    return (req, res, next) => {
        fs.appendFile(
            filename,
            `\n${Date.now()}:${req.ip} ${req.method}: ${req.path}`,
            (err) => {
                if (err) {
                    console.error('Failed to log request:', err);
                }
                next();
            }
        );
    };
};