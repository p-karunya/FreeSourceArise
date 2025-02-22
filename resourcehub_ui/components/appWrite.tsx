import { Client, Account } from 'appwrite';

const Mainclient = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
    .setProject('67b9d1b70027eb8cb2e1'); // Your project ID

const MainAccount = new Account(Mainclient);

export { Mainclient, MainAccount};