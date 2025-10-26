import { defineConfig } from "cypress";
import admin from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { plugin as cypressFirebasePlugin } from 'cypress-firebase';
import serviceAccount from "../../prosjekt/appevent/cypress/key/appevent-9ca9c-firebase-adminsdk-fbsvc-420088c002.json" assert {type:"json"};
//https://www.npmjs.com/package/cypress-firebase downloaded 12.02.2025
export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });

      return cypressFirebasePlugin(on, config, admin);
    },
  },
});
