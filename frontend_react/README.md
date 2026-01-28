# SocialBoard React Frontend

A modern, lightweight React UI for a social media dashboard featuring a sidebar layout with Dashboard, Profile, and Admin sections. Styled with a light theme and branded accents.

## Features

- Sidebar navigation: Dashboard, Profile, Admin (visible when user is admin)
- Analytics overview: key metrics, recent posts, performance summary
- Profile view: user info and account details
- Admin area: user management, system health, security notes
- Modern light theme with the following palette:
  - Primary: `#3B82F6`
  - Secondary: `#10B981`
  - Success: `#F59E0B`
  - Error: `#EF4444`
  - Background: `#f9fafb`
  - Surface: `#ffffff`
  - Text: `#111827`

## Getting Started

In the project directory, you can run:

### `npm start`
Run the app in development mode at http://localhost:3000

### `npm test`
Run tests in watch mode.

### `npm run build`
Build the production bundle.

## Customization

Theme variables are defined in `src/App.css`. Update CSS variables in the `:root` block to customize colors.

Environment variables are read via `process.env` (e.g., `REACT_APP_API_BASE`). See `.env.example` in the root container for required variables if applicable.

## Notes
- Routing is implemented as simple tab switching for brevity. You can integrate `react-router` later if deep links are required.
- Admin visibility is controlled by a simple `isAdmin` state in `App.js` for demonstration.
