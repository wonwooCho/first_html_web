var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;

    console.log(`* URL: ${_url}`);
    console.log(`* parsed query data: ${queryData.id}`);

    if (_url == '/') {
        title = 'Welcome';
        queryData.id = 'index';
    }

    if (_url == '/favicon.ico') {
        response.writeHead(404);
        response.end();
        return;
    }

    response.writeHead(200);
    fs.readFile(`data/${queryData.id}`, 'utf8', (err, data) =>
    {
        if (err) throw err;

        var template = `
        <!DOCTYPE html>
    
        <html>
            <head>
                <title>${title} - My Primitive Web</title>
                <meta charset="utf-8">
            </head>
        
            <body>
                ${data}
            </body>
        </html>
        `;

        response.end(template);

    });
});

app.listen(3000);