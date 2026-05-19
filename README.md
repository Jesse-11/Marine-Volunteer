# Marine Volunteer

Marine volunteering website with a static frontend and an Express/MySQL API for login, events, users, organizations, and admin workflows.

## Run Locally

```bash
npm install
npm start
```

The app runs at `http://127.0.0.1:3000` by default. Set `PORT` or `HOST` if needed.

## Database

The API expects a MySQL database. Create the schema with:

```bash
mysql -u root -p < databases/db.sql
```

Database settings can be configured with environment variables:

```bash
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=WDC_db
SESSION_SECRET=change-me
```

Use `.env.example` as a reference for shell exports or hosted environment variables.

The server no longer queries the database during startup, so the static pages can run even if MySQL is not available. API routes that need MySQL will still return errors until a database is configured.

## Static Deployment

GitHub Pages and Netlify do not run the Express server or MySQL database. They can host the static pages only.

Build the static site with:

```bash
npm run build
```

This copies `public/` to `dist/`.

### Netlify

The included `netlify.toml` builds with `npm run build` and publishes `dist`.

### GitHub Pages

The included GitHub Actions workflow builds `dist` and deploys it to GitHub Pages on pushes to `main`. In the repository settings, set Pages to use GitHub Actions.
