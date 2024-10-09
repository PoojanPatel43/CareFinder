// Import required modules
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS to allow cross-origin requests

// Define the API key and base URL for external API
const API_KEY = 'ecbfe0bc04de34b44baba9dab69980be';
const API_BASE_URL = 'http://www.knautzfamilywi.com/CareFinder-1.0.0/api';

// A route to handle city/state-based hospital requests
app.get('/api/hospitals/citystate/:city/:state', async (req, res) => {
    const { city, state } = req.params; // Extract city and state from the request parameters
    const url = `${API_BASE_URL}/hospitals/citystate/${city}/${state}`; // Construct the URL
    console.log(`API Request URL: ${url}`); 

    try {
        // Make a GET request to the external API
        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/xml', // Specify that we want XML data
                'X-API-KEY': API_KEY, // Provide the API key in the request header
            },
        });
        res.send(response.data); // Send the API response back to the client
    } catch (error) {
        // Handle errors and log them for debugging
        console.error(`Error for ${url}:`, error.message);
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        } else {
            // Send a generic error message if no response was received
            res.status(500).send(`Error: ${error.message}`);
        }
    }
});

// A more general route for other endpoints
app.get('/api/:endpoint/:param1?/:param2?', async (req, res) => {
    const { endpoint, param1, param2 } = req.params; // Extract parameters
    let url = `${API_BASE_URL}/${endpoint}`; 
    
    // Append additional parameters if they exist
    if (param1) url += `/${encodeURIComponent(param1)}`;
    if (param2) url += `/${encodeURIComponent(param2)}`;

    console.log(`Requesting URL: ${url}`); 

    try {
        console.log('Sending request to external API');
        console.log('Headers:', {
            'Accept': 'application/xml',
            'X-API-KEY': API_KEY.substring(0, 5) + '...'
        });
        
        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/xml',
                'X-API-KEY': API_KEY,
            },
        });
        
        // Log and send the API response data
        console.log('Response received from external API');
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        res.send(response.data);
    } catch (error) {
        console.error('Error occurred:', error.message);
        if (error.response) {
            console.error('Error status:', error.response.status);
            console.error('Error headers:', error.response.headers);
            console.error('Error data:', error.response.data);
            res.status(error.response.status).send(`Error: ${JSON.stringify(error.response.data)}`);
        } else if (error.request) {
            console.error('No response received from external API');
            res.status(500).send('Error: No response received from the external API');
        } else {
            console.error('Error details:', error);
            res.status(500).send(`Error: ${error.message}`);
        }
    }
});

// Start the server and listen on a specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
