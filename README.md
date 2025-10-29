# Country Data API

This project is a robust backend service built with Node.js and Express that aggregates, stores, and serves detailed information about countries worldwide. It fetches data from external REST APIs, processes it, and persists it in a MySQL database using Prisma ORM, providing a clean and efficient RESTful interface for querying country data.

## Features

- **Data Aggregation**: Fetches and combines country information and currency exchange rates from external sources.
- **Database Persistence**: Utilizes Prisma ORM for seamless data management and storage in a MySQL database.
- **RESTful Endpoints**: Exposes a clear set of endpoints for retrieving, refreshing, and managing country data.
- **Query Filtering**: Supports filtering countries by specific criteria such as region and currency code.
- **Data Refresh Mechanism**: Includes an endpoint to update the entire country dataset on demand.

## Technologies Used

| Technology                                     | Description                                                  |
| :--------------------------------------------- | :----------------------------------------------------------- |
| [Node.js](https://nodejs.org/)                 | JavaScript runtime for building the server-side application. |
| [Express.js](https://expressjs.com/)           | Fast, unopinionated, minimalist web framework for Node.js.   |
| [Prisma](https://www.prisma.io/)               | Next-generation ORM for Node.js and TypeScript.              |
| [MySQL](https://www.mysql.com/)                | Relational database used for data persistence.               |
| [dotenv](https://www.npmjs.com/package/dotenv) | Module for loading environment variables from a `.env` file. |
| [Helmet](https://helmetjs.github.io/)          | Helps secure Express apps by setting various HTTP headers.   |

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/Onyedika1234/hng-task3.git
    cd hng-task3
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Set up environment variables**
    Create a `.env` file in the root of the project and add the following variables:

    ```env
    # Server configuration
    PORT=3000

    # Database connection URL (Prisma)
    DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"

    # External API URLs
    URL1="https://restcountries.com/v2/all?fields=name,capital,region,population,flag,currencies"
    URL2="https://open.er-api.com/v6/latest/USD"
    ```

4.  **Run database migrations**
    This will set up the `Country` table in your database based on the Prisma schema.

    ```bash
    npx prisma migrate dev
    ```

5.  **Run the application**
    ```bash
    npm run dev
    ```
    The server will start on the port specified in your `.env` file.

## API Documentation

### Base URL

`http://localhost:3000/countries`

### Endpoints

#### GET /countries

Retrieves a list of all countries. Supports filtering by `region` and `currency` query parameters.

**Query Parameters**:

- `region` (optional): Filters countries by region (e.g., `Africa`, `Europe`).
- `currency` (optional): Filters countries by currency code (e.g., `USD`, `NGN`).

**Request**:
`GET /countries?region=Africa&currency=NGN`

**Response**:

```json
[
  {
    "id": 161,
    "name": "Nigeria",
    "capital": "Abuja",
    "region": "Africa",
    "population": 206139587,
    "currency_code": "NGN",
    "exchange_rate": 412.18,
    "estimated_gdp": 500125.7,
    "flag_url": "https://restcountries.eu/data/nga.svg",
    "last_refreshed_at": "2024-07-28T10:00:00.000Z"
  }
]
```

**Errors**:

- `500`: Internal server error.

---

#### POST /countries/refresh

Fetches the latest data from external APIs, processes it, and updates the local database.

**Request**:
No request body is required.

**Response**:

```json
{
  "message": "Countries data refreshed successfully."
}
```

**Errors**:

- `503`: External data source unavailable.
- `500`: Internal server error.

---

#### GET /countries/status

Provides the total count of countries in the database and the timestamp of the last refresh.

**Request**:
No request payload.

**Response**:

```json
{
  "total_country": 250,
  "last_refreshed": "2024-07-28T10:30:00.123Z"
}
```

**Errors**:

- `500`: Internal server error.

---

#### GET /countries/:name

Retrieves a single country by its unique name.

**Request**:
URL parameter `name` is the full name of the country.

**Response**:

```json
{
  "id": 161,
  "name": "Nigeria",
  "capital": "Abuja",
  "region": "Africa",
  "population": 206139587,
  "currency_code": "NGN",
  "exchange_rate": 412.18,
  "estimated_gdp": 500125.7,
  "flag_url": "https://restcountries.eu/data/nga.svg",
  "last_refreshed_at": "2024-07-28T10:00:00.000Z"
}
```

**Errors**:

- `400`: Validation failed (if name parameter is missing).
- `404`: Country not found.
- `500`: Internal server error.

---

#### DELETE /countries/:name

Deletes a country from the database by its unique name.

**Request**:
URL parameter `name` is the full name of the country.

**Response**:

- `204`: No Content (on successful deletion).

**Errors**:

- `500`: Internal server error.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  **Fork the Project**
2.  **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3.  **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4.  **Push to the Branch** (`git push origin feature/AmazingFeature`)
5.  **Open a Pull Request**

## License

This project is licensed under the ISC License.

## Author

- **Onyedika**
