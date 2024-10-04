const SERVER_URL = 'http://localhost:3000/api';

// Log errors for debugging
function logError(message) {
    const errorLog = document.getElementById('error-log');
    const timestamp = new Date().toISOString();
    errorLog.innerHTML += `[${timestamp}] ${message}\n`;
    console.error(message);
}

// Function to create a human-readable card from the XML data
function createHospitalCard(name, address, city, state, zip, type, ownership) {
    return `
        <div class="card">
            <h3>${name}</h3>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>City:</strong> ${city}</p>
            <p><strong>State:</strong> ${state}</p>
            <p><strong>ZIP:</strong> ${zip}</p>
            <p><strong>Type:</strong> ${type}</p>
            <p><strong>Ownership:</strong> ${ownership}</p>
        </div>
    `;
}

// Send the request to the server and handle the response
async function sendRequest() {
    const endpoint = document.getElementById('endpoint').value;
    const param1 = document.getElementById('param1').value;
    const param2 = document.getElementById('param2').value;

    let url = `${SERVER_URL}/${endpoint}`;
    
    if (endpoint === 'hospitals/citystate') {
        if (param1 && param2) {
            url += `?city=${param1}&state=${param2}`;
        } else {
            logError("Please provide both city and state.");
            return;
        }
    } else {
        if (param1) url += `/${param1}`;
        if (param2) url += `/${param2}`;
    }

    document.getElementById('result').innerHTML = '';
    document.getElementById('cards-view').innerHTML = '';
    document.getElementById('error-log').innerHTML = '';
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';

    try {
        logError(`Sending request to: ${url}`);
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/xml',
            }
        });

        logError(`Response status: ${response.status}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const xml = await response.text();
        document.getElementById('result').innerHTML = `<h2>Raw XML:</h2><pre>${xml}</pre>`;

        // Parse the XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, "application/xml");
        const hospitals = xmlDoc.getElementsByTagName("hospital");

        // Format and display the data
        document.getElementById('formattedData').innerHTML = formatXMLData(xml);

        // Clear error log
        // document.getElementById('error-log').innerText = '';
    } catch (error) {
        logError(`Error details: ${error.message}`);
        document.getElementById('result').innerHTML = `<p style="color: red;">Error fetching data: ${error.message}</p>`;
        
        if (error.message.includes('Failed to fetch')) {
            logError('Network error detected. Possible reasons:');
            logError('1. The server is not running. Make sure to start your Node.js server.');
            logError('2. CORS is not properly configured on the server.');
            logError(`3. The server URL is incorrect. Current URL: ${SERVER_URL}`);
            logError('4. There\'s a network connectivity issue.');
        }
    } finally {
        spinner.style.display = 'none';
    }
}

function formatXMLData(xmlText) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

    let htmlContent = '';
    const items = xmlDoc.getElementsByTagName('item');
    
    for (let i = 0; i < items.length; i++) {
        htmlContent += `
        <div class="hospital-record">
            <table>
                <tr><th>Provider ID</th><td>${items[i].getElementsByTagName('provider_id')[0]?.textContent || 'N/A'}</td></tr>
                <tr><th>Hospital Name</th><td>${items[i].getElementsByTagName('hospital_name')[0]?.textContent || 'N/A'}</td></tr>
                <tr><th>Address</th><td>${items[i].getElementsByTagName('address')[0]?.textContent || 'N/A'}</td></tr>
                <tr><th>City</th><td>${items[i].getElementsByTagName('city')[0]?.textContent || 'N/A'}</td></tr>
                <tr><th>State</th><td>${items[i].getElementsByTagName('state')[0]?.textContent || 'N/A'}</td></tr>
                <tr><th>Zip Code</th><td>${items[i].getElementsByTagName('zip_code')[0]?.textContent || 'N/A'}</td></tr>
                <tr><th>County Name</th><td>${items[i].getElementsByTagName('county_name')[0]?.textContent || 'N/A'}</td></tr>
                <tr><th>Hospital Type</th><td>${items[i].getElementsByTagName('hospital_type')[0]?.textContent || 'N/A'}</td></tr>
                <tr><th>Ownership</th><td>${items[i].getElementsByTagName('hospital_ownership')[0]?.textContent || 'N/A'}</td></tr>
                <tr><th>Emergency Services</th><td>${items[i].getElementsByTagName('emergency_services')[0]?.textContent || 'N/A'}</td></tr>
                <tr><th>Latitude</th><td>${items[i].getElementsByTagName('latitude')[0]?.textContent || 'N/A'}</td></tr>
                <tr><th>Longitude</th><td>${items[i].getElementsByTagName('longitude')[0]?.textContent || 'N/A'}</td></tr>
            </table>
        </div>
        `;
    }

    return htmlContent;
}
