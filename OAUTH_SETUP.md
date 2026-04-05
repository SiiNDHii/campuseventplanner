# Google OAuth Setup Guide

This guide will help you set up Google OAuth authentication for the Campus Event Planner application.

## Prerequisites

- Google Cloud Console account
- Node.js and npm installed
- The Campus Event Planner application set up locally

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top left
3. Click "New Project"
4. Give your project a name (e.g., "Campus Event Planner")
5. Click "Create"
6. Wait for the project to be created and select it

## Step 2: Enable Google OAuth API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google+ API"
3. Click on "Google+ API"
4. Click "Enable"

Alternatively, search for and enable:
- "Google Identity" or "Google+ API"

## Step 3: Create OAuth Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. If prompted, click "Configure OAuth consent screen first"

### Configure OAuth Consent Screen:

1. Choose "External" as the user type
2. Click "Create"
3. Fill in the OAuth consent screen form:
   - **App name**: Campus Event Planner
   - **User support email**: your-email@example.com
   - **Developer contact**: your-email@example.com
4. Click "Save and Continue"
5. On the "Scopes" page, click "Save and Continue" (default scopes are fine)
6. On the "Test users" page, add your Google account email
7. Click "Save and Continue"
8. Review and go back

### Create the OAuth Client ID:

1. Go back to "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Web application"
4. Name it "Campus Event Planner Web"
5. Add Authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)
6. Add Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google`
7. Click "Create"
8. Copy the Client ID and Client Secret

## Step 4: Configure Environment Variables

1. Create or update `.env.local` in your project root
2. Add your Google credentials:

```env
# Google OAuth
GOOGLE_CLIENT_ID="your-client-id-here"
GOOGLE_CLIENT_SECRET="your-client-secret-here"

# NextAuth Configuration
AUTH_SECRET="generate-a-random-secret-with-at-least-32-characters"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_URL_INTERNAL="http://localhost:3000"

# Database
DATABASE_URL="file:./dev.db"

# OpenAI (if using chatbot)
OPENAI_API_KEY="your-openai-key"
```

### Generate AUTH_SECRET:

Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```

Or use Node.js:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 5: Start the Application

1. Install dependencies:
```bash
npm install
```

2. Run database migrations:
```bash
npx prisma migrate dev
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:3000 in your browser

## Step 6: Test OAuth Flow

### First-Time Login (New User):

1. Go to the login page
2. Click "Continue with Google"
3. Sign in with your Google account
4. You will be automatically assigned a role based on your email:
   - `sindhisweetguy@gmail.com` → Organizer
   - `jahanzaibhoo924@gmail.com` → Organizer
   - `jahanzaibkhanmaitlo@gmail.com` → Admin
   - Any other email → Student
5. You should be redirected to `/events` page

### Existing User Login:

1. Go to the login page
2. Click "Continue with Google"
3. Sign in with the same Google account
4. You should be redirected to the appropriate dashboard based on your role

### Admin Dashboard Access:

1. Log in with an admin email (`jahanzaibkhanmaitlo@gmail.com`)
2. You will see the option to access the admin dashboard

### Organizer Dashboard Access:

1. Log in with an organizer email
2. You will see the organization options in the navigation menu

## Role-Based Access Control

The application implements the following role-based access control:

- **Admin**: Full access to `/admin` route, can manage all users and events
- **Organizer**: Access to `/organizer` route, can create and manage events
- **Student**: Access to `/events`, `/notifications`, `/profile`, `/settings`, `/support`

## Troubleshooting

### "Invalid Client ID" Error

- Verify your `GOOGLE_CLIENT_ID` is correct
- Check that the Client ID hasn't been regenerated in Google Cloud Console
- Ensure your `.env.local` file is saved

### "Redirect URI Mismatch" Error

- Check that your redirect URIs in Google Cloud Console match exactly:
  - Development: `http://localhost:3000/api/auth/callback/google`
  - Production: Use your actual domain
- Clear browser cookies and cache
- Restart the development server

### "AUTH_SECRET not found" Error

- Ensure `AUTH_SECRET` is set in `.env.local`
- Generate a new secret using the command above
- Restart the development server

### User Not Assigned Correct Role

- Check the email address used to sign in
- Verify it matches one of the configured role-mapping emails in `src/app/api/auth/[...nextauth]/route.ts`
- Check the database to ensure the role was updated correctly:
  ```bash
  npx prisma studio
  ```

### Session Not Persisting

- Check that cookies are enabled in your browser
- Verify `NEXTAUTH_URL` is set correctly
- Clear browser storage and sign in again

## Customizing Role Mapping

To change which emails get assigned which roles, edit `src/app/api/auth/[...nextauth]/route.ts`:

```typescript
const ROLE_MAPPING: Record<string, string> = {
  "your-email@example.com": "ORGANIZER",
  "admin-email@example.com": "ADMIN",
  // Add more email -> role mappings as needed
};
```

After making changes, restart your development server.

## Production Deployment

Before deploying to production:

1. Update the domain in Google Cloud Console authorized origins and redirect URIs
2. Set production environment variables on your hosting platform
3. Update `NEXTAUTH_URL` to your production domain
4. Use a strong, random `AUTH_SECRET` (different from development)
5. Ensure your database is properly backed up
6. Test the OAuth flow on production before going live

## Support

For issues with Google OAuth setup, refer to:
- [Google Cloud Documentation](https://cloud.google.com/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [OAuth 2.0 Best Practices](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics)
