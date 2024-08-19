import React from "react";
import GoogleMapReact from 'google-map-react';
import { useState, useEffect } from 'react';
import './App.css';

export default function SimpleMap(){

  const [coordinates, setCoordinates] = useState([]);
  const [center, setCenter] = useState({lat: 39.8283, lng: -98.5795}); // center of U.S. as default
  const [zoom, setZoom] = useState(4);

  const handleGpxFile = (event) => {
    const gpxFile = event.target.files[0];
    if(!gpxFile){
      console.log("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append('gpxFile', gpxFile);
    fetch('http://localhost:3200/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setCoordinates(data.coordinates);
        setCenter(data.center || { lat: 39.8283, lng: -98.5795 });
        setZoom(12);
      })
      .catch((error) => console.error('Error uploading file:', error));
  };

  const CoordinatesLogger = ({ coordinates }) => {
    useEffect(() => {
      if(coordinates.length > 0) {
        coordinates.forEach((coord, index) => {
          console.log(`Coordinate ${index + 1}: Latitude: ${coord.lat}, Longitude: ${coord.lng}`);
        });
      }
      else{
        console.log("No coordinates found");
      }
    }, [coordinates]);
    return null;
  }

  var heatMapData = {
    positions: coordinates,
    options: {
      radius: 10,
      opacity: 0.8
    }
  }

return (
  <div className="flex h-screen">
    <div className="w-1/3 border-r p-3">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-dmsans text-center">
        HeatMap Visualizer
      </h1>
      <p className="text-xl text-left pt-6 pl-4">
        A heatmap visualizing tool to allow users to quickly visualize data.<br></br>
        <span className="block mb-2"></span>
        Currently parses through GPX files and displays points, but functionality for parsing Google Timeline data is currently being worked on
      </p>

      <span className="block mb-20"></span>
      <div className="flex items-center justify-center">
        <input
          type="file"
          id="fileInput"
          onChange={handleGpxFile}
          className="hidden"
        />
        <label
          htmlFor="fileInput"
          className="p-3 bg-blue-500 text-white rounded shadow-lg hover:bg-blue-600 transition-colors duration-300 font-dmsans cursor-pointer"
        >
          Upload GPX File
        </label>
      </div>
    </div>

    <div>
      <CoordinatesLogger coordinates={coordinates} />
    </div>

    <div className="w-2/3 h-full border-l border-gray-500" style={{ borderLeftWidth: '5px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ 
          key: process.env.REACT_APP_GOOGLEMAPS_API_KEY,
          libraries: ['visualization']
        }}
        center={center}
        zoom={zoom}
        heatmapLibrary={true}
        heatmap={heatMapData}
      >
      </GoogleMapReact>
    </div>
  </div>
  );
}
