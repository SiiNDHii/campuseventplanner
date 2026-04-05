# OAuth Testing Guide

This document provides comprehensive testing instructions for the Google OAuth implementation.

## Test Accounts

Use these email addresses to test different roles:

| Email | Role | Expected Access |
|-------|------|-----------------|
| sindhisweetguy@gmail.com | Organizer | Event creation, organizer dashboard |
| jahanzaibhoo924@gmail.com | Organizer | Event creation, organizer dashboard |
| jahanzaibkhanmaitlo@gmail.com | Admin | Admin dashboard, system management |
| any-other@gmail.com | Student | Event browsing, registration |

## Prerequisites

Before testing, ensure:

1. Google OAuth credentials are set in `.env.local`
   ```bash
   echo "GOOGLE_CLIENT_ID=your-id" >> .env.local
   echo "GOOGLE_CLIENT_SECRET=your-secret" >> .env.local
   echo "AUTH_SECRET=$(openssl rand -base64 32)" >> .env.local
   ```

2. Database is migrated
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

3. Development server is running
   ```bash
   npm run dev
   ```

4. Browser is at `http://localhost:3000`

## Test Flows

### Test 1: First-Time Login (New User)

**Objective**: Verify new user account creation, role assignment, and profile picture storage

**Steps**:
1. Navigate to http://localhost:3000/login
2. Click "Continue with Google"
3. Sign in with a Google account that is NOT in the test accounts list (e.g., testuser@gmail.com)
4. Authorize the application
5. You should be redirected to `/events` page (Student role)
6. Verify profile picture is displayed in the navigation menu

**Expected Outcomes**:
- ✅ New user created in database with role "STUDENT"
- ✅ Profile picture from Google is stored in User.image
- ✅ User is redirected to `/events` page
- ✅ User name appears in navigation menu
- ✅ Session cookie is created (check DevTools > Application > Cookies)

**Verification Commands**:
```bash
# Check database
npx prisma studio

# Look for the new user in the User table
# Verify: email, role="STUDENT", image is populated, createdAt is recent
```

---

### Test 2: First-Time Login (Organizer Email)

**Objective**: Verify organizer role assignment on first login

**Steps**:
1. Navigate to http://localhost:3000/login
2. Click "Continue with Google"
3. Sign in with `sindhisweetguy@gmail.com`
4. Authorize the application
5. You should be redirected to `/organizer/events` page
6. Verify the navigation shows "Organize" option

**Expected Outcomes**:
- ✅ User created with role "ORGANIZER"
- ✅ Redirect to `/organizer/events` (organizer dashboard)
- ✅ Navigation menu shows organizer options
- ✅ Can access event creation interface
- ✅ Cannot access admin dashboard

**Verification Commands**:
```bash
# Check the database for the organizer
npx prisma studio
# Filter User table: role should be "ORGANIZER"
```

---

### Test 3: First-Time Login (Admin Email)

**Objective**: Verify admin role assignment and dashboard access

**Steps**:
1. Clear browser cookies: DevTools > Application > Cookies > Delete all
2. Navigate to http://localhost:3000/login
3. Click "Continue with Google"
4. Sign in with `jahanzaibkhanmaitlo@gmail.com`
5. Authorize the application
6. You should be redirected to `/admin` page
7. Verify the admin dashboard displays statistics

**Expected Outcomes**:
- ✅ User created with role "ADMIN"
- ✅ Redirect to `/admin` (admin dashboard)
- ✅ Admin dashboard shows system statistics
- ✅ Can access admin-only features
- ✅ Can also access organizer features

**Verification Commands**:
```bash
# Check the database for the admin
npx prisma studio
# Filter User table: role should be "ADMIN"
```

---

### Test 4: Existing User Login

**Objective**: Verify that existing users are not recreated and maintain their role

**Steps**:
1. Ensure you have a user in the database (from Test 1 or 2)
2. Sign out: Click user menu > "Sign out"
3. Navigate to http://localhost:3000/login
4. Click "Continue with Google"
5. Sign in with the SAME email you used in step 1
6. You should be redirected to the appropriate dashboard for your role

**Expected Outcomes**:
- ✅ No duplicate user created
- ✅ User role is preserved
- ✅ User profile picture is up-to-date
- ✅ User's previous data (events, registrations) is accessible

**Verification Commands**:
```bash
# Check that only one user exists with that email
npx prisma studio
# Filter User table: should have only 1 record with the email
# Verify: updatedAt timestamp is recent
```

---

### Test 5: Role-Based Access Control (Admin Routes)

**Objective**: Verify that non-admin users cannot access admin routes

**Steps**:
1. Sign in with a student account (non-admin email)
2. Try to navigate to http://localhost:3000/admin
3. You should be redirected to the home page (`/`)

**Expected Outcomes**:
- ✅ Non-admin users cannot access `/admin`
- ✅ Redirected to home page
- ✅ No error page shown
- ✅ Route is protected by middleware

---

### Test 6: Role-Based Access Control (Organizer Routes)

**Objective**: Verify that only organizers and admins can access organizer routes

**Steps**:
1. Sign in with a student account
2. Try to navigate to http://localhost:3000/organizer/events
3. You should be redirected to home page
4. Now sign out and sign in with an organizer account
5. Navigate to http://localhost:3000/organizer/events
6. You should see the organizer event management interface

**Expected Outcomes**:
- ✅ Students cannot access `/organizer/events`
- ✅ Organizers can access `/organizer/events`
- ✅ Admins can access `/organizer/events`
- ✅ Redirect happens before page load

---

### Test 7: Home Page Dashboard Role Display

**Objective**: Verify that the dashboard shows role-specific content

**Steps**:
1. Sign in with `jahanzaibkhanmaitlo@gmail.com` (admin)
2. Navigate to `/dashboard` or home page
3. Verify the page shows admin-specific content if applicable
4. Sign out and sign in with an organizer account
5. Navigate to `/dashboard`
6. Verify organizer-specific content is shown

**Expected Outcomes**:
- ✅ Dashboard adapts based on user role
- ✅ Admin sees admin statistics
- ✅ Organizer sees their events
- ✅ Student sees event browsing interface

---

### Test 8: Session Persistence

**Objective**: Verify that sessions persist across browser requests

**Steps**:
1. Sign in with your test account
2. Close the browser tab (not all tabs)
3. Open a new tab and navigate to http://localhost:3000
4. Verify you are still logged in
5. Navigate to different pages
6. Verify you remain logged in

**Expected Outcomes**:
- ✅ Session persists across page navigation
- ✅ JWT token is valid for 30 days
- ✅ Logout clears the session completely
- ✅ Session cookie is httpOnly (cannot be accessed by JavaScript)

---

### Test 9: Sign Out Functionality

**Objective**: Verify that sign out properly clears the session

**Steps**:
1. Sign in with your test account
2. Click the user menu
3. Click "Sign out"
4. You should be redirected to home page
5. Verify session cookie is deleted: DevTools > Application > Cookies
6. Try to navigate to a protected route like `/admin`
7. You should be redirected to `/login`

**Expected Outcomes**:
- ✅ User is logged out
- ✅ Redirected to home page
- ✅ Session cookie is deleted
- ✅ Protected routes require login
- ✅ Cannot access sensitive data

---

## Advanced Testing Scenarios

### Test 10: Multiple Browsers/Devices

**Objective**: Verify OAuth works across different devices/browsers

**Steps**:
1. Log in on Firefox
2. Simultaneously log in on Chrome with a different account
3. Verify both sessions are independent
4. Sign out on Firefox
5. Verify Chrome session is unaffected

**Expected Outcomes**:
- ✅ Multiple sessions can coexist
- ✅ Sessions are independent
- ✅ Sign out only affects current session/device

---

### Test 11: Expired Session Handling

**Objective**: Verify that expired sessions are properly handled

**Steps**:
1. Sign in normally
2. Wait 30 days (or modify test: clear session cookie manually)
3. Try to access a protected route
4. You should be redirected to `/login`

**Expected Outcomes**:
- ✅ Expired session is detected
- ✅ User is redirected to login
- ✅ Message indicates session expired

---

## Database Verification

After running tests, verify the database state:

```bash
# Open Prisma Studio
npx prisma studio
```

**Check User Table**:
- Verify users have correct roles
- Verify Google profile pictures are stored in `image` field
- Verify `createdAt` and `updatedAt` timestamps
- Verify `email` is unique (no duplicates)

**Check Account Table**:
- Verify OAuth account linkage
- Verify provider is "google"
- Verify `access_token` and `refresh_token` are stored

**Check Session Table**:
- Verify active sessions exist
- Verify session tokens are unique
- Verify expiration dates are correct

---

## Browser DevTools Verification

### Application > Cookies

- Session cookie should be named: `next-auth.session-token` (or similar)
- Value should be a JWT token
- HttpOnly flag should be set
- Secure flag should be set in production
- SameSite should be "Lax"

### Application > Local Storage

- Should be empty (NextAuth uses cookies by default)

### Network Tab

- OAuth callback should return 200 or 301 redirect
- Session cookie should be set on response headers
- Subsequent requests should include session cookie

### Console

- Should show no authentication-related errors
- Should show NextAuth initialization message (if enabled)

---

## Error Testing

### Test 12: Invalid OAuth Configuration

**Steps**:
1. Temporarily modify `GOOGLE_CLIENT_ID` to invalid value
2. Try to sign in
3. You should see error page

**Expected**: Graceful error handling

---

### Test 13: Network Error Handling

**Steps**:
1. Go offline (DevTools > Network > Offline)
2. Try to sign in
3. Go back online after getting error
4. Try again

**Expected**: Application handles network errors gracefully

---

## Performance Testing

### Test 14: Login Performance

**Objective**: Verify login completes within acceptable time

**Steps**:
1. Open DevTools > Network tab
2. Click "Continue with Google"
3. Complete OAuth flow
4. Note the total time from click to redirect

**Expected**: Login should complete within 5-10 seconds

---

## Security Testing

### Test 15: CSRF Protection

**Objective**: Verify CSRF tokens are in place

**Steps**:
1. Open DevTools > Network tab
2. Inspect OAuth callback request
3. Verify CSRF token is included (state parameter)

**Expected**: NextAuth includes CSRF protection

---

### Test 16: XSS Prevention

**Objective**: Verify user data is properly escaped

**Steps**:
1. Update user name to include `<script>alert('xss')</script>`
2. Navigate to pages displaying user name
3. Verify script doesn't execute
4. Check page source to verify tags are escaped

**Expected**: All user input is properly HTML escaped

---

## Checklist

- [ ] New user creation works
- [ ] Organizer emails get ORGANIZER role
- [ ] Admin emails get ADMIN role
- [ ] Other emails get STUDENT role
- [ ] Existing users are not duplicated
- [ ] Role-based redirects work correctly
- [ ] Admin routes are protected
- [ ] Organizer routes are protected
- [ ] Session persistence works
- [ ] Sign out clears session
- [ ] Profile pictures are stored
- [ ] Database is properly updated
- [ ] No errors in console
- [ ] No errors in server logs
- [ ] Performance is acceptable
- [ ] CSRF protection is in place
- [ ] XSS attacks are prevented

## Reporting Issues

If you encounter issues during testing:

1. Check the server console for errors
2. Check browser console for errors
3. Verify `.env.local` has correct credentials
4. Clear browser cookies and cache
5. Restart development server
6. Check database state with `npx prisma studio`
7. Review OAUTH_SETUP.md for troubleshooting

---

## Quick Test Script

```bash
# Run all tests quickly
npm run dev &

# Wait for server to start
sleep 5

# Open browser
npx start-server-and-test "npm run dev" http://localhost:3000

# Manual test checklist will appear
```

---

## Conclusion

After successfully completing all tests, your Google OAuth implementation is production-ready. Ensure to:

1. Update credentials for production
2. Add production domain to Google Cloud Console
3. Set strong AUTH_SECRET
4. Test on staging environment
5. Monitor for errors after deploying to production
