const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const API_KEY = 'ecbfe0bc04de34b44baba9dab69980be';
const API_BASE_URL = 'http://www.knautzfamilywi.com/CareFinder-1.0.0/api';

app.get('/api/:endpoint/:param1?/:param2?', async (req, res) => {
    const { endpoint, param1, param2 } = req.params;
    let url = `${API_BASE_URL}/${endpoint}`;
    
    if (endpoint === 'hospitals/citystate') {
        if (param1 && param2) {
            url = `${API_BASE_URL}/hospitals/${encodeURIComponent(param1)}/${encodeURIComponent(param2)}`;
        } else {
            return res.status(400).send('Both city and state parameters are required for citystate endpoint');
        }
    } else {
        if (param1) url += `/${encodeURIComponent(param1)}`;
        if (param2) url += `/${encodeURIComponent(param2)}`;
    }

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});