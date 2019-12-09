var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function (request, response) {
    var inURL = request.url;
    var inData = url.parse(inURL, true);
    var title = inData.query.id;
    var pathName = inData.pathname;

    console.log(inData);

    if (pathName == '/') {

        if (title == undefined) {
            title = 'index';
        }

        fs.readFile(`data/${title}`, 'utf8', (err, data) => {

            var template = `
            <!DOCTYPE html>
        
            <html>
                <head>
                    <title>${title} - My Primitive Web</title>
                    <meta charset="utf-8">
                </head>
                <body>
                <h1><a href="/">WELCOME TO MY WEB PAGE</a></h1>
                <h2>
                    <ol>
                        <li><a href="/?id=about_me">About me</a></li>
                        <li><a href="/?id=images">Images</a></li>
                        <li><a href="/?id=paragraphs">Paragraphs</a></li>
                    </ol>
                </h2>
                    <h2>${title}</h2>
                    <p>${data}</p>
                </body>
            </html>
            `;
    
            response.writeHead(200);
            response.end(template);
        });
    } else {
        response.writeHead(404);
        response.end('Not Found');
    }
});

app.listen(3000);