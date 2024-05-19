const express = require("express")
const campaignRoutes = express.Router();
const fs = require('fs');

const dataPath = './Details/campaignDB.json'


campaignRoutes.post('/campaigns/add', (req, res) => {

  
  let jsonData = JSON.stringify(req.body);
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
  const exists = fs.existsSync(dataPath);
  if (exists) {
      fs.readFile(dataPath, function (err, data) {

          let json = JSON.parse(data);
          json.push(jsonData);
          fs.writeFile(dataPath, JSON.stringify(json), (err) => {
              if (err) {
                  console.error('Error writing JSON file:', err);
              } else {
                  console.log('JSON data has been written to', dataPath);
              }
          })
      });
  } else {
      console.log("File does not exists");
      let json = [];
      json.push(jsonData);
      fs.writeFile(dataPath, JSON.stringify(json), (err) => {
          if (err) {
              console.error('Error writing JSON file:', err);
          } else {
              console.log('JSON data has been written to', dataPath);
          }
      })
  }

  res.send({ success: true, msg: 'account data added successfully' })
})


campaignRoutes.get('/campaigns/list', (req, res) => {
    const exists = fs.existsSync(dataPath);
    let result = [];
    if (exists) {
        result = fs.readFileSync(dataPath);
    }
    let data = JSON.parse(result);
    data = data.filter(function (obj) {
        return obj.status == 'Published';
    });
    console.log(data);
    res.send(data);
})


module.exports = campaignRoutes