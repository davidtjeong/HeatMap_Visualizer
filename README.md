# HeatMap Visualizer
Learning heatmap visualization techniques utilizing Google Maps API. Parses gpx files to quickly visualize data and trails and handles file uploads for parsing

A full stack web application with a React frontend designed with Tailwind CSS and a Node/Express backend. Dependencies are managed with Yarn. The server is hosted on AWS EC2.

## How to run
First, install the dependencies in the root directory: `yarn install`
- Ensure to run `yarn install` within both the client and server directories as well to install their respective dependencies.

Run `yarn start` to concurrently launch the backend server and frontend client when in the root directory
To run either the client or server separately in the root directory:
- `yarn workspace client start`
- `yarn workspace server start`