const express = require('express');
const cors  =require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { parseString } = require('xml2js');

const app = express();
app.use(cors());
const port = 80;

const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload', upload.single('gpxFile'), (req, res) => {

  const fileBuffer = req.file.buffer.toString('utf8');

    parseString(fileBuffer, (err, result) => {
      if(err){
        return res.status(500).send('Error parsing the gpx file');
      }
      const coordinates = result.gpx.trk[0].trkseg[0].trkpt.map(point => ({
        lat: parseFloat(point.$.lat),
        lng: parseFloat(point.$.lon)
      }));

      // Calculate the center
      const numPoints = coordinates.length;
      const center = coordinates.reduce((acc, point) => {
        acc.lat += point.lat;
        acc.lng += point.lng;
        return acc;
      }, { lat: 0, lng: 0 });

      center.lat /= numPoints;
      center.lng /= numPoints;

      res.json({ coordinates, center }); // return the coordinates and center
    });
  });

app.listen(port, () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});