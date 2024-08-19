const express = require('express');
const cors  =require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { parseString } = require('xml2js');

const app = express();
app.use(cors());
const port = 3200;

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('gpxFile'), (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.file.filename);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if(err){
      return res.status(500).send('Error reading file');
    }

    parseString(data, (err, result) => {
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

      fs.unlink(filePath, (err) => {
        if(err){
          console.error('Error deleting file:', err);
        }
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});