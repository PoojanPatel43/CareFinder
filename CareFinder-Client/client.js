const SERVER_URL = 'http://localhost:3000/api';

function toggleParameters() {
    const endpoint = document.getElementById('endpoint').value;
    const param1Div = document.getElementById('param1Div');
    const param2Div = document.getElementById('param2Div');
    const param1Input = document.getElementById('param1');
    const param2Input = document.getElementById('param2');

    // Reset parameter inputs and hide them initially
    param1Div.style.display = 'none';
    param2Div.style.display = 'none';
    param1Input.value = '';
    param2Input.value = '';

    // Show appropriate parameter inputs based on selected endpoint
    if (endpoint === 'hospitals/id' || endpoint === 'hospitals/city' || 
        endpoint === 'hospitals/state' || endpoint === 'hospitals/county' || 
        endpoint === 'hospitals/name') {
        param1Div.style.display = 'block';
        param1Input.placeholder = "Enter " + endpoint.split('/')[1];
    } else if (endpoint === 'hospitals/citystate') {
        param1Div.style.display = 'block';
        param2Div.style.display = 'block';
        param1Input.placeholder = "Enter City";
        param2Input.placeholder = "Enter State";
    }
}

function logError(message) {
    const errorLog = document.getElementById('error-log');
    const timestamp = new Date().toISOString();
    errorLog.innerHTML += `[${timestamp}] ${message}\n`;
    console.error(message);
}

async function sendRequest() {
    const endpoint = document.getElementById('endpoint').value;
    const param1 = document.getElementById('param1').value;
    const param2 = document.getElementById('param2').value;

    let url = `${SERVER_URL}/${endpoint}`;
    
    if (endpoint === 'hospitals/citystate') {
        console.log(`City/State Selected: ${param1}, ${param2}`);
        if (param1 && param2) {
            url += `/${encodeURIComponent(param1)}/${encodeURIComponent(param2)}`;
        } else {
            logError("Please provide both city and state.");
            return;
        }
    } else {
        if (param1) url += `/${encodeURIComponent(param1)}`;
        if (param2) url += `/${encodeURIComponent(param2)}`;
    }

    document.getElementById('result').innerHTML = '';
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
        
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const jsonResponse = await response.json();
            if (jsonResponse.debugLog) {
                logError("Debug information:");
                jsonResponse.debugLog.forEach(log => logError(log));
            }
            if (jsonResponse.error) {
                throw new Error(jsonResponse.error);
            }
        } else {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const xml = await response.text();
            document.getElementById('result').innerHTML = `<h2>Raw XML:</h2><pre>${xml}</pre>`;

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xml, "application/xml");
            const hospitals = xmlDoc.getElementsByTagName("hospital");

            document.getElementById('formattedData').innerHTML = formatXMLData(xml);
        }
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
