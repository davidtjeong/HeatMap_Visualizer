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
    fetch('/test')
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
  <div>
    <h1>Header 1</h1>
    <div>
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
    </div>

    <div className="googleMap">
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
