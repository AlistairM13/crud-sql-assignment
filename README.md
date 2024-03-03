# How to run

Clone the repository:

```sh
git clone https://github.com/AlistairM13/crud-sql-assignment.git
```

Files are stored in firebase, so you need to have access to firebase store follow these steps

- Sign in to [Firebase](https://firebase.google.com) (it's free)
- Click `Create a project` and fill in the details
- Next, click on the web icon, in the `Get started by adding Firebase to your app` Call to action.
  - Provide a suitable name and `Register app`
  - Copy the `firebaseConfig` object from the code snippet shown, this is required for the environment variables
- Now that you have you app setup, let's setup your storage
  - In the sidebar menu select Build > Storage and `Get started`
  - Choose test mode for now and location closest to you (I have chosen asia-south1) and hit `done`
- Now you are done with the firebase setup

Open the .env file in backend/.env
and fill these values (the ones prefixed with FIREBASE\_ are found in you firebaseConfig that you copied) :

```sh
DATABASE_URL =
FIREBASE_API_KEY =
FIREBASE_AUTH_DOMAIN =
FIREBASE_PROJECT_ID =
FIREBASE_STORAGE_BUCKET =
FIREBASE_MESSAGING_SENDER_ID =
FIREBASE_APP_ID =
PORT =
```

Run the frontend:

```sh
cd frontend
```

```sh
pnpm install
pnpm dev
```

or

```sh
npm install
npm run dev
```

Run the backend

```sh
cd backend
```

```sh
pnpm install
pnpm dev
```

or

```sh
npm install
npm run dev
```
