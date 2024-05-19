const express = require("express")
const bodyParser = require("body-parser")
const fs = require('fs');

// create our express app
const app = express()
// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
// route
const routes = require('./Routes/Route')
app.use('/', routes)
app.use(express.static(__dirname + '/'));
//start server
app.listen(3000, () => {
    console.log("listeniing at port:3000")
});
app.get('/', function (request, response) {
    response.sendFile(__dirname + '/createCampaign.html');
});
app.post("/saveEvergage", function (req, res) {

    let jsonData = JSON.stringify(req.body);
    const filePath = 'data.json';
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";

    //specify the length for the new string  
    const lenString = 7;
    let randomstring = '';

    //loop to select a new character in each iteration  
    for (var i = 0; i < lenString; i++) {
        var rnum = Math.floor(Math.random() * characters.length);
        randomstring += characters.substring(rnum, rnum + 1);
    }
    jsonData = JSON.parse(jsonData);
    jsonData.campaignId = randomstring;
    console.log(jsonData);
    const exists = fs.existsSync("data.json");
    if (exists) {
        fs.readFile(filePath, function (err, data) {

            let json = JSON.parse(data);
            json.push(jsonData);
            fs.writeFile(filePath, JSON.stringify(json), (err) => {
                if (err) {
                    console.error('Error writing JSON file:', err);
                } else {
                    console.log('JSON data has been written to', filePath);
                }
            })
        });
    } else {
        console.log("File does not exists");
        let json = [];
        json.push(jsonData);
        fs.writeFile(filePath, JSON.stringify(json), (err) => {
            if (err) {
                console.error('Error writing JSON file:', err);
            } else {
                console.log('JSON data has been written to', filePath);
            }
        })
    }

});
app.get('/getAllPublishedEvergage', function (request, response) {
    const filePath = 'data.json';
    const exists = fs.existsSync("data.json");
    let result = [];
    if (exists) {
        result = fs.readFileSync(filePath);
        
        /* fs.readFile(filePath, function (err, data) {

            let json = JSON.parse(data);
            result = json.filter(function (obj) {
                return obj.status == 'Published';
            });
            //console.log(result);
        }); */
    } 
    let data = JSON.parse(result);
    data = data.filter(function (obj) {
        return obj.status == 'Published';
    });
    console.log(data);
    response.send(data);
});