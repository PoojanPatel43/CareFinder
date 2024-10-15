# CareFinder Client

CareFinder Client is a user-friendly web application designed to interact with a hospital information API. This client allows users to query hospital data using different parameters such as ID, city, state, county, and more. It is developed using HTML, CSS, and JavaScript, with a Node.js backend for API interactions.

## Features

- **Interactive UI**: A clean, responsive interface with options to select API endpoints and provide necessary parameters.
- **Multiple Endpoints Support**: Includes functionality to fetch data based on different criteria:
  - Get all hospitals.
  - Get hospital by ID.
  - Get hospitals by city.
  - Get hospitals by state.
  - Get hospitals by county.
  - Get hospitals by city/state combination.
  - Get hospitals by name.
- **Loading Spinner**: Displays a spinner while data is being fetched, enhancing the user experience.
- **Error Handling**: Displays error logs if there are issues with the API request.
- **Data Formatting**: Displays retrieved data in a user-friendly format, with card views and structured tables.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js (for CORS handling and API interaction)


## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, etc.)
- Internet connection for making API requests.
- **Node.js**: Ensure you have Node.js installed on your machine.
- **NPM**: Comes bundled with Node.js.

## Project Structure

- **CareFinder_Client.pdf**: PDF version of the implementation document.
- **CareFinder_Client.docx**: Word document version of the implementation document.
- **apiProxyServer.js**: Node.js server that proxies API requests.
- **client.js**: JavaScript code for handling client-side logic.
- **index.html**: Main HTML page for the client interface.
- **style.css**: Styles for the client UI.
- **node_modules/**: Directory containing dependencies.
- **.gitignore**: Specifies files and directories that should be ignored by Git.
- **README.md**: Documentation and instructions for the project.
- **package-lock.json**: Lockfile for managing Node.js dependencies.
- **package.json**: Node.js configuration file that lists dependencies and scripts.


## Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone https://github.com/PoojanPatel43/CareFinder.git
   cd CareFinder/CareFinder-Client

2. **Install dependencies**:
    ```bash
    npm install
    
3. **Start the Node.js proxy server**:
    ```bash
    node apiProxyServer.js

4. **Open the index.html file in your browser to interact with the CareFinder client**.

## Usage
1. Select an endpoint from the dropdown.
2. Enter the required parameters in the input fields.
3. Click the "Send Request" button to fetch data.
4. Results will be displayed below in a formatted manner.

## Known Issues & Bugs
1. CORS Policy: API calls from the frontend directly to the server may run into CORS restrictions. The Node.js proxy server apiProxyServer.js is implemented to handle this.
2. Data Formatting: Some responses might need additional formatting for better readability.
3. UI Improvements: Future versions may include more interactive input fields and enhanced error handling.

## Contributing
Feel free to open issues or submit pull requests for improvements or bug fixes. All contributions are welcome!

License
This project is licensed under the MIT License.

© 2024 CareFinder Client. All rights reserved.


