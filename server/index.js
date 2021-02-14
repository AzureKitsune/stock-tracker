const port = 3001;

const express = require('express');
const fs = require("fs");
const app = express();
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch');

app.use(cors());

//Hard-coded backend data.
var subredditsData = [{
  name: "wallstreetbets",
  online_url: "https://www.reddit.com/r/wallstreetbets/.rss?f=flair_name%3A%22News%22",
  local_url: "/data/wallstreetbets.rss"
}, {
  name: "investing",
  online_url: "https://www.reddit.com/r/investing/.rss",
  local_url: "/data/investing.rss"
}];


app.get('/api/:name/', (req, res) => {
  let subredditName = req.params["name"];
  let subredditData = subredditsData.find(item => item.name === subredditName);

  if (subredditData !== undefined) {
    let localFileName = __dirname + path.sep + subredditData.local_url;
    fs.readFile(localFileName, function (err, data) {
      if (err) {
         return console.error(err);
      }
      res.send(data.toString());
   });
  } else {
    res.sendStatus(404);
  }
});

app.get('/api/:name/live/', (req, res) => {
  let subredditName = req.params["name"];
  let subredditData = subredditsData.find(item => item.name === subredditName);

  console.log('Request: ' + res);
  if (subredditData !== undefined) {
    //do live data magic.
    let headers = {
      "Accept"       : "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "User-Agent"   : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63"
    };
    fetch(subredditData.online_url, {headers})
    .then(f => f.text())
    .then(text => res.send(text));
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});