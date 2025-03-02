# Project Name

## Setup Instructions

1. Clone the repository:
   ```sh
   git clone https://github.com/Mayank4352/Scaler_task
   ```
2. Navigate to the project directory:
   ```sh
   cd scaler_task
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Next follow Usage Guidlines mentioned below

## Architecture

The project follows a modular architecture with the following components:

- **Frontend**: Built with React, located in the `frontend` directory.
- **Backend**: Built with Node.js and Express, located in the `backend` directory.

## Usage Guidelines

1. Ensure the backend server is running:
   ```sh
   cd server
   npm run dev
   ```
2. Start the frontend application:
   ```sh
   cd scaler_task
   npm run dev
   ```
3. Access the application in your browser at `http://localhost:3000`.

## Gemini Integration

The application integrates with the Gemini API for cryptocurrency data. The integration works as follows:

1. **API Key**: Obtain an API key from Gemini and set it in your environment variables.
   ```sh
   export GEMINI_API_KEY=your_api_key
   ```
2. **Fetching Data**: The backend service fetches cryptocurrency data from Gemini using the API key.
3. **Data Processing**: The fetched data is processed and stored in the MongoDB database.
4. **Frontend Display**: The processed data is sent to the frontend and displayed to the user.

For more details on the Gemini API, refer to the [official documentation](https://docs.gemini.com/rest-api/).
