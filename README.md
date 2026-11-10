# Hotel Management Application

A responsive hotel listing and management application developed using React.js and Redux Toolkit.

## Features

- Display hotels using cards.
- Add, edit and delete hotels.
- Upload hotel images with preview.
- Search hotels by title.
- Filter hotels by price range.
- Pagination.
- View complete hotel details.
- Display hotel location using React Leaflet and OpenStreetMap.
- Get user's current location using Browser Geolocation API.
- Display hotel and user locations on the map.
- Responsive design.

## Technologies Used

- React.js
- Redux Toolkit
- React Router DOM
- HTML5
- CSS3
- React Leaflet
- Browser Geolocation API
- React Helmet Async

## Installation

**1. Clone the repository**

```bash
git clone <repository-url>
```

**2. Navigate to the project folder**

```bash
cd hotel_management
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the application**

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

## Geolocation

The application uses the browser's Geolocation API to get the user's current latitude and longitude.

The user's location and hotel location are displayed on the interactive map using React Leaflet.

Location permission must be granted by the user.

## Note

- This is a frontend-only application.
- Hotel data is managed using Redux Toolkit and local JavaScript data.
- Changes are not permanently saved after refreshing the browser.

## Author

**Sri Raja Guru**

GitHub: https://github.com/srirajaguru