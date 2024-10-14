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

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/PoojanPatel43/carefinder.git
    ```
2. Navigate to the project folder:
    ```bash
    cd carefinder-client
    ```
3. Open `index.html` in your web browser.

### Usage

1. Open the `index.html` file in your preferred browser.
2. Select the desired API endpoint (e.g., "Get All Hospitals", "Get Hospitals by City").
3. Enter the required parameters (if any).
4. Click the "Send Request" button.
5. View the results in the formatted output section or any errors in the error log.

## Project Structure


