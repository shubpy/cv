const http = require('http');
const HOST = 'localhost';
const PORT = 3000;

const server = http.createServer( (req, res) => {
    require('./router').get(req, res);
});

var start = function() {
    server.listen( PORT, HOST, () => {
        console.log(`Server running at http://${HOST}:${PORT}`);
    });
}

exports.start = start;

