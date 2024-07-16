import React from "react";
import GoogleMapReact from 'google-map-react';
import './App.css';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

var heatMapData = {
  positions: [
    {lat: 35.0, lng: 127.7},
    {lat: 35.0, lng: 127.7},
    {lat: 35.0, lng: 127.7},
    {lat: 35.0, lng: 127.7},
    {lat: 41.3163, lng: -72.9223},
    {lat: 41.3163, lng: -72.9223},
    {lat: 41.3163, lng: -72.9223},
    {lat: 41.3163, lng: -72.9223},
    {lat: 41.3163, lng: -72.9223},
    {lat: 41.3163, lng: -72.9223},
    {lat: 41.3163, lng: -72.9223},
  ],
  options: {
    radius: 20,
    opacity: 0.8
  }
}

// onMapClick({x, y, lat, lng, event}) {
//   if (this._googleMap !== undefined) {
//     const point = new google.maps.LatLng(lat, lng)
//     this._googleMap.heatmap.data.push(point)
//   }
// }

export default function SimpleMap(){

  const defaultProps = {
    center: {lat: 41.3163, lng: -72.9223},
    zoom: 11
  };

return (
  <div>
    <h1>Header 1</h1>
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
        // onClick={this.onMapClick.bind(this)}
      >
        <AnyReactComponent
          lat={40.762312}
          lng={-73.979345}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  </div>
  );
}
