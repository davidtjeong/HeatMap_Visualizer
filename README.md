# HeatMap Visualizer
Heatmap visualization utilizing Google Maps API, allowing for simple data visualization of geographic coordinates. Parses .gpx files to quickly visualize data and trails and handles file uploads for parsing

A full stack web application with a React front-end designed with Tailwind CSS and a Node/Express back-end. Dependencies are managed with Yarn. The server is hosted on AWS EC2.

<img width="1504" alt="Screenshot 2024-08-27 at 1 12 45 PM" src="https://github.com/user-attachments/assets/1c201e01-0e57-401f-8ecf-a160cef8cbe7">
<img width="1502" alt="Screenshot 2024-08-27 at 1 14 09 PM" src="https://github.com/user-attachments/assets/c7a4eb01-d727-46b3-af02-364d9b57bfbd">
<img width="1501" alt="Screenshot 2024-08-27 at 1 14 25 PM" src="https://github.com/user-attachments/assets/950c66e4-da4a-4f9c-b5ed-00412f9087fb">

## How to run
First, install the dependencies in the root directory: `yarn install`
- Ensure to run `yarn install` within both the client and server directories as well to install their respective dependencies.

Run `yarn start` to concurrently launch the backend server and frontend client when in the root directory
To run either the client or server separately from the root directory:
- `yarn workspace client start`
- `yarn workspace server start`
