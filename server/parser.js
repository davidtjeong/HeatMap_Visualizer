const express = require('express');
const cors  =require('cors');
const fs = require('fs');
const xml2js = require('xml2js');

const app = express();
app.use(cors());
const port = 3200;

// Function to read and parse GPX file
const parseGpxFile = (filePath, callback) => {

  fs.readFile(filePath, (err, data) => {

    if (err) throw err;
    xml2js.parseString(data, (err, result) => {
      if (err) throw err;
      const trkpts = result.gpx.trk[0].trkseg[0].trkpt;
      const coordinates = trkpts.map(trkpt => ({
        lat: trkpt.$.lat,
        lng: trkpt.$.lon
      }));
      
      callback(coordinates);
    });
  });
};


app.get('/test', (req, res) => {
  parseGpxFile('../example.gpx', coordinates => {
    res.json(coordinates);
  });
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});