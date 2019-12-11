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

        fs.readdir('./data', (err, fileLst) => {
            fs.readFile(`data/${title}`, 'utf8', (err, data) => {
                var menuList = createMenuList(fileLst);
                var resultCode = generateCodeFromMenuList(menuList, title, data);
        
                response.writeHead(200);
                response.end(resultCode);
            });
        });

    } else {
        response.writeHead(404);
        response.end('Not Found');
    }
});

function createMenuList(fileLst) {
    var menuList = '<ul>';
    for (var i = 0; i < fileLst.length; ++i) {
        if (fileLst[i] != 'index')
            menuList += `<li><a href="/?id=${fileLst[i]}">${fileLst[i]}</a></li>`;
    }
    menuList += '</ul>';
    return menuList;
}

function generateCodeFromMenuList(inMenuList, title, data) {
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
            ${inMenuList}
        </h2>
            <h2>${title}</h2>
            <p>${data}</p>
        </body>
    </html>
    `;

    return template;
}

app.listen(3000);