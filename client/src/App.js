import React from "react";
import GoogleMapReact from 'google-map-react';
import { useState, useEffect } from 'react';
import './App.css';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap(){

  const [coordinates, setCoordinates] = useState([]);
  const defaultProps = {
    center: {lat: 39.8283, lng: -98.5795},
    zoom: 4
  };

  useEffect(() => {
    fetch('http://localhost:3200/test')
      .then(response => response.json())
      .then(data => {
        setCoordinates(data);
      })
      .catch(error => console.error('Error fetching coordinates:', error));
  }, []);

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
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans text-center">
        HeatMap Visualizer
      </h1>
      {/* <div>
        {coordinates.length > 0 ? (
          <ul>
            {coordinates.map((coord, index) => (
              <li key={index}>
                Latitude: {coord.lat}, Longitude: {coord.lng}
              </li>
            ))}
          </ul>
        ) : (
          <p>No coordinates available</p>
        )}
      </div> */}
      <p className="text-xl text-left pt-6 pl-4">
        A heatmap visualizing tool to allow users to quickly visualize data.<br></br>
        <span className="block mb-2"></span>
        Currently parses through GPX files and displays points, but functionality for parsing Google Timeline data is currently being worked on
      </p>

      <span className="block mb-20"></span>

      <div className="flex items-center justify-center">
        <button className="p-3 bg-blue-500 text-white rounded shadow-lg hover:bg-blue-600 transition-colors duration-300">
          Click here to upload a gpx file
        </button>
      </div>
    </div>

    <div className="w-2/3 h-full border-l border-gray-500" style={{ borderLeftWidth: '5px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ 
          key: process.env.REACT_APP_GOOGLEMAPS_API_KEY,
          libraries: ['visualization']
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        heatmapLibrary={true}
        heatmap={heatMapData}
      >
        {/* <AnyReactComponent
          lat={40.762312}
          lng={-73.979345}
          text="My Marker"
        /> */}
      </GoogleMapReact>
    </div>
  </div>
  );
}
