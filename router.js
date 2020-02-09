const fs = require('fs');
const path = require('path');

const resumeData = require('./src/models/resume-model');

const doDataBinding = function(data, databindings){
    for(var prop in databindings)
        if( databindings.hasOwnProperty(prop) ) {
            data = data.toString().split('${'+prop+'}').join(databindings[prop]);
            console.log(prop);
        }
            
    return data;
};

var get = function(req, res) {
    console.log(`Requested: ${req.url}`);
    if(req.url === '/') {
        // Home page call
        req.url = 'index.html';
    }
    let reqType = {
        '.html': { type: 'html', mime: 'text/html' },
        '.css' : { type: 'css', mime: 'text/css' },
        '.js' : { type: 'js', mime: 'text/javascript' },
        '.jpeg': { type: 'image', mime: 'image/jpeg' },
        '.png': { type: 'image', mime: 'image/png' },
        '.jpg': { type: 'image', mime: 'image/jpeg' } 
    } [ String(path.extname(req.url)).toLowerCase() ];

    if(reqType !== undefined) {
        if(req.url === 'index.html' && reqType.type === 'html') {
            //Data Binding with homepage.
            resumeData.fetch().then( dbData => {
                fs.readFile('./index.html', function(err, content){
                    if (err) throw err;
 
                    let bindingData = {
                        'page-title': 'Shubham Wadhwa CV',
                        'work': dbData[0],
                        'projects': dbData[1],
                        'education': dbData[2] 
                    };
                    res.statusCode = 200; 
                    res.setHeader('Content-type' , reqType.mime);
                    res.write(doDataBinding(content,bindingData));
                    res.end();
                });
            });

        } else {
            fs.readFile('./'+ req.url, function(err, data) {
                if(!err) {
                    //Serve Static files
                    res.statusCode = 200; 
                    res.setHeader('Content-type' , reqType.mime);
                    res.end(data, reqType.type === 'image'? 'Base64': 'utf8');
                    //console.log( req.url, reqType.mime );
                } else {
                    console.log ('file not found: ' + req.url);
                    res.writeHead(404, "Not Found");
                    res.end();
                }
            })
        }
    } else {
        console.log ('file not found: ' + req.url);
        res.writeHead(404, "Not Found");
        res.end();
    }
};

exports.get = get;