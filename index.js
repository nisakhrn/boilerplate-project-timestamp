const express = require('express');
const app = express();

// Enable CORS for FCC testing
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Timestamp Microservice</title>
    </head>
    <body style="font-family: sans-serif; text-align: center; padding: 30px;">
      <h1>Timestamp Microservice</h1>
      <hr>
      <h3>Example Usage:</h3>
      <p><a href="/api/2015-12-25">[project url]/api/2015-12-25</a></p>
      <p><a href="/api/1451001600000">[project url]/api/1451001600000</a></p>
      <h3>Example Output:</h3>
      <code>{"unix": 1451001600000, "utc": "Fri, 25 Dec 2015 00:00:00 GMT"}</code>
      <br><br>
      <p>By <a href="https://www.freecodecamp.org" target="_blank">freeCodeCamp.org</a></p>
    </body>
    </html>
  `);
});

app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  let date;

  if (!dateParam) {
    date = new Date();
  } else if (/^\d+$/.test(dateParam)) {
    date = new Date(parseInt(dateParam));
  } else {
    date = new Date(dateParam);
  }

  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});