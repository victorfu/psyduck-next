# Psyduck Next

This project uses Next.js 13 and integrates LINE's Node.js SDK, enabling support for multiple webhook URLs. This advanced setup allows multiple LINE bots to share the same webhook endpoint, streamlining bot management. The platform continues to feature Firebase authentication and Firestore, all built on React, TypeScript, and Tailwind CSS. It's a robust solution for rapidly developing web applications that capitalize on Next.js 13's server components, with the added benefit of integrated LINE bot functionality.

## Requirements

- Enable Google Sign-In in your firebase project.
- Enable LINE developer console.

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

`NEXT_PUBLIC_*` variables are public variables that can be accessed in the browser.

### Server Side

Configure the following environment variables for the server to use firebase-admin:

```bash
FIREBASE_ADMIN_CREDENTIAL
FIREBASE_ADMIN_DATABASE_URL
```

`FIREBASE_ADMIN_CREDENTIAL` is a JSON stringified version of your firebase admin credential.
Firebase admin credential are typically stored in a JSON file that is generated in the Firebase Console.

`FIREBASE_ADMIN_DATABASE_URL` is the URL of your firebase database. It should be in the format of `https://<project-id>.firebaseio.com`

## Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment on Vercel

You need to have a vercel account. You can sign up at [https://vercel.com/](https://vercel.com/). Connect your github repository to vercel and deploy the project. The auth-domain of your firebase project should be set to the domain of your vercel deployment.

## License

Psyduck-Next is licensed under the MIT license.
