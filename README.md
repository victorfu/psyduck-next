# Psyduck Next

A Next.js 13 boilerplate with firebase authentication and firestore, based on React, TypeScript, and Tailwind CSS.

## Requirements

Enable Google Sign-In in your firebase project.

### Client Side

Configure the following environment variables for the web app to use firebase:

```bash
NEXT_PUBLIC_API_KEY
NEXT_PUBLIC_AUTH_DOMAIN
NEXT_PUBLIC_PROJECT_ID
NEXT_PUBLIC_STORAGE_BUCKET
NEXT_PUBLIC_MESSAGING_SENDER_ID
NEXT_PUBLIC_APP_ID
NEXT_PUBLIC_MEASUREMENT_ID
```

`NEXT_PUBLIC_*` variables are public variables that can be accessed in the browser. The rest are private variables that can only be accessed in the server.

### Server Side

Configure the following environment variables for the server to use firebase-admin:

```bash
FIREBASE_ADMIN_CREDENTIAL
FIREBASE_ADMIN_DATABASE_URL
```

`FIREBASE_ADMIN_CREDENTIAL` is a JSON stringified version of your firebase admin credential. You can get it from your firebase project settings.

`FIREBASE_ADMIN_DATABASE_URL` is the URL of your firebase database. It should be in the format of `https://<project-id>.firebaseio.com`

## Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment on Vercel

Configure the auth-domain of your firebase project to the domain of your vercel deployment.
