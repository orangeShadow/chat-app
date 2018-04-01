require('./config/config');

const path = require('path');
const publicPath = path.join(__dirname,'..','public');
const express = require('express');
const fs = require('fs');

const app = express();

const port = process.env.PORT;

app.use(express.static(publicPath));

// app.get('/', (res,req) => {
//     let body = fs.readFileSync(path.join(publicPath,'index.html'));
//     req.send(body.toString());
//     req.setHeader('Content-type:text/html');
// });

if(!module.parent){
    app.listen(port, () => {
      console.log(`Started up at port ${port}`);
    });
  }
  
  module.exports = { app };
  